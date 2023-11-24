import $pb from 'protobufjs/minimal.js';

function indexOutOfRange(reader: $pb.Reader, writeLength?: number) {
  return RangeError(
    'index out of range: ' +
      reader.pos +
      ' + ' +
      (writeLength || 1) +
      ' > ' +
      reader.len,
  );
}

const EMPTY_ARR = new Uint8Array(0);

let uint32_value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
export class StreamProtobufReader<T> extends $pb.Reader {
  #chunks: Uint8Array[];

  #bufStartPos = 0;
  #bufIndex = 0;
  #bufOffset = 0;

  #decode: (length: number) => T;

  constructor(decoder: { decode(reader: $pb.Reader, length: number): T }) {
    super(EMPTY_ARR);
    this.#decode = decoder.decode.bind(decoder, this);
    this.#chunks = this.buf.length > 0 ? [this.buf] : [];
    this.len = this.#chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const oldPos = this.pos;
    Object.defineProperty(this, 'buf', {
      get() {
        if (this.#chunks.length > 1) {
          console.warn('Concatenating chunks, this is probably inefficient');
          const fullChunk = new Uint8Array(this.len);
          let offset = 0;
          for (const chunk of this.#chunks) {
            fullChunk.set(chunk, offset);
            offset += chunk.length;
          }
          this.#chunks = [fullChunk];
        }
        return this.#chunks[0] ?? EMPTY_ARR;
      },
      set(value: Uint8Array) {
        this.#chunks = value.length > 0 ? [value] : [];
        this.len = value.length;
      },
    });
    Object.defineProperty(this, 'pos', {
      get(this: StreamProtobufReader<T>) {
        return this.#bufStartPos + this.#bufOffset;
      },
      set(this: StreamProtobufReader<T>, value: number) {
        if (value >= this.#bufStartPos) {
          value -= this.#bufStartPos;
          if (value < this.#chunks[this.#bufIndex].length) {
            this.#bufOffset = value;
            return;
          }
          while (value >= this.#chunks[this.#bufIndex].length) {
            value -= this.#chunks[this.#bufIndex++].length;
          }
          this.#bufOffset = value;
          return;
        }
      },
    });
    if (oldPos !== 0) {
      this.pos = oldPos;
    }
  }

  public clear() {
    this.#chunks = [];
    this.#bufStartPos = 0;
    this.#bufIndex = 0;
    this.#bufOffset = 0;
    this.len = 0;
  }

  public append(chunk: Uint8Array) {
    if (chunk.length === 0) return;
    this.#chunks.push(chunk);
    this.len += chunk.length;
  }

  #incPos(n = 1) {
    let newOffset = this.#bufOffset + n;
    if (newOffset < this.#chunks[this.#bufIndex].length) {
      this.#bufOffset = newOffset;
      return;
    }
    while (newOffset > 0 && newOffset >= this.#chunks[this.#bufIndex].length) {
      this.#bufStartPos += this.#chunks[this.#bufIndex].length;
      newOffset -= this.#chunks[this.#bufIndex++].length;
    }
    this.#bufOffset = newOffset;
  }

  #curByte() {
    if (this.#bufIndex >= this.#chunks.length) {
      throw indexOutOfRange(this);
    }
    return this.#chunks[this.#bufIndex][this.#bufOffset];
  }

  #consumeByte() {
    try {
      return this.#curByte();
    } finally {
      this.#incPos();
    }
  }

  #peekUint32(): [value: number, len: number] | null {
    let byte = 0xff;
    let bufIndex = this.#bufIndex;
    let bufOffset = this.#bufOffset;
    let pos = this.#bufStartPos + bufOffset;
    const len = this.len;
    const chunks = this.#chunks;
    function incPos(n = 1) {
      let newOffset = bufOffset + n;
      if (newOffset < chunks[bufIndex].length) {
        bufOffset = newOffset;
        pos += n;
        return;
      }
      while (newOffset > 0 && newOffset >= chunks[bufIndex].length) {
        newOffset -= chunks[bufIndex++].length;
      }
      pos += n;
      bufOffset = newOffset;
    }

    function curByte(this: StreamProtobufReader<T>) {
      if (bufIndex >= chunks.length) {
        throw indexOutOfRange(this);
      }
      return chunks[bufIndex][bufOffset];
    }

    const consumeByte = function consumeByte(this: StreamProtobufReader<T>) {
      try {
        return curByte.call(this);
      } finally {
        incPos();
      }
    }.bind(this);
    if (pos >= len) return null;
    uint32_value = (byte = consumeByte()) & 127;
    if (byte < 128) return [uint32_value, 1];

    if (pos >= len) return null;
    uint32_value = (uint32_value | (((byte = consumeByte()) & 127) << 7)) >>> 0;
    if (byte < 128) return [uint32_value, 2];

    if (pos >= len) return null;
    uint32_value =
      (uint32_value | (((byte = consumeByte()) & 127) << 14)) >>> 0;
    if (byte < 128) return [uint32_value, 3];

    if (pos >= len) return null;
    uint32_value =
      (uint32_value | (((byte = consumeByte()) & 127) << 21)) >>> 0;
    if (byte < 128) return [uint32_value, 4];

    if (pos >= len) return null;
    uint32_value = (uint32_value | (((byte = consumeByte()) & 15) << 28)) >>> 0;
    if (byte < 128) return [uint32_value, 5];

    while (pos < len)
      if (consumeByte() < 128)
        return [uint32_value, pos - (this.#bufStartPos + bufOffset)];
    return null;
  }

  public next() {
    const peek = this.#peekUint32();
    if (peek == null) return null;
    const [value, len] = peek;
    if (this.len - this.pos < len + value) return null;
    this.#incPos(len);
    try {
      return this.#decode(value);
    } finally {
      if (this.#bufIndex > 0) {
        this.#chunks = this.#chunks.slice(this.#bufIndex);
        this.len -= this.#bufStartPos;
        this.#bufStartPos = 0;
        this.#bufIndex = 0;
      }
    }
  }

  public len: number;
  public uint32(): number {
    let byte = 0xff;
    uint32_value = ((byte = this.#consumeByte()) & 127) >>> 0;
    if (byte < 128) return uint32_value;
    uint32_value =
      (uint32_value | (((byte = this.#consumeByte()) & 127) << 7)) >>> 0;
    if (byte < 128) return uint32_value;
    uint32_value =
      (uint32_value | (((byte = this.#consumeByte()) & 127) << 14)) >>> 0;
    if (byte < 128) return uint32_value;
    uint32_value =
      (uint32_value | (((byte = this.#consumeByte()) & 127) << 21)) >>> 0;
    if (byte < 128) return uint32_value;
    uint32_value =
      (uint32_value | (((byte = this.#consumeByte()) & 15) << 28)) >>> 0;
    if (byte < 128) return uint32_value;

    while (this.pos < this.len)
      if (this.#consumeByte() < 128) return uint32_value;
    throw indexOutOfRange(this);
  }
  public int32(): number {
    return this.uint32() | 0;
  }
  public sint32(): number {
    const value = this.uint32();
    return ((value >>> 1) ^ -(value & 1)) | 0;
  }
  public bool(): boolean {
    return this.uint32() !== 0;
  }
  public fixed32(): number {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    return (
      (this.#consumeByte() |
        (this.#consumeByte() << 8) |
        (this.#consumeByte() << 16) |
        (this.#consumeByte() << 24)) >>>
      0
    );
  }
  public sfixed32(): number {
    return this.fixed32() | 0;
  }
  public float(): number {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);

    const buf = new Uint8Array(4);
    buf[0] = this.#consumeByte();
    buf[1] = this.#consumeByte();
    buf[2] = this.#consumeByte();
    buf[3] = this.#consumeByte();
    const value = $pb.util.float.readFloatLE(buf, 0);

    return value;
  }
  public double(): number {
    if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);

    const buf = new Uint8Array(8);
    buf[0] = this.#consumeByte();
    buf[1] = this.#consumeByte();
    buf[2] = this.#consumeByte();
    buf[3] = this.#consumeByte();
    buf[4] = this.#consumeByte();
    buf[5] = this.#consumeByte();
    buf[6] = this.#consumeByte();
    buf[7] = this.#consumeByte();
    const value = $pb.util.float.readDoubleLE(buf, 0);

    return value;
  }
  public bytes(): Uint8Array {
    const length = this.uint32();

    if (this.pos + length > this.len) throw indexOutOfRange(this, length);

    const buf = new Uint8Array(length);
    let remaining = length;
    while (remaining > 0) {
      if (this.#chunks[this.#bufIndex].length - this.#bufOffset >= remaining) {
        buf.set(
          this.#chunks[this.#bufIndex].subarray(
            this.#bufOffset,
            this.#bufOffset + remaining,
          ),
          length - remaining,
        );
        this.#bufOffset += remaining;
        if (this.#bufOffset === this.#chunks[this.#bufIndex].length) {
          this.#bufOffset = 0;
          this.#bufStartPos += this.#chunks[this.#bufIndex].length;
          this.#bufIndex++;
        }
        remaining = 0;
      } else {
        buf.set(
          this.#chunks[this.#bufIndex].subarray(this.#bufOffset),
          length - remaining,
        );
        remaining -= this.#chunks[this.#bufIndex].length - this.#bufOffset;
        this.#bufOffset = 0;
        this.#bufStartPos += this.#chunks[this.#bufIndex].length;
        this.#bufIndex++;
      }
    }
    return buf;
  }
  public string(): string {
    const bytes = this.bytes();
    return $pb.util.utf8.read(bytes, 0, bytes.length);
  }
  public skip(length?: number): this {
    if (typeof length === 'number') {
      if (this.pos + length > this.len) throw indexOutOfRange(this, length);
      this.#incPos(length);
    } else {
      do {
        if (this.pos >= this.len) throw indexOutOfRange(this);
      } while (this.#consumeByte() & 128);
    }
    return this;
  }
  public skipType(wireType: number): this {
    switch (wireType) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        while ((wireType = this.uint32() & 7) !== 4) {
          this.skipType(wireType);
        }
        break;
      case 5:
        this.skip(4);
        break;

      default:
        throw Error('invalid wire type ' + wireType + ' at offset ' + this.pos);
    }
    return this;
  }
}

export default StreamProtobufReader;
