/**
 * The flipper screen format is a 128x64 monochrome bitmap.
 * Each byte represents 8 vertical pixels. The first byte
 * represents the top left 8 pixels column, the second byte
 * the next 8 pixels column, one step to the right, and so on
 * until column 128 is reached (index 127). Then the next byte
 * represents the next 8 pixels column, one step down, back to the left
 * (index 128).
 *
 * ```plaintext
 *   ┏━━━━┯━━┯━━┯━━┯━━┯━━┯━━┯━━┯━━┯━━━┯━━┯━━┯━━┯━━┯━━┯━━┯━━┯━━┓
 *   ┃Byte│00│01│02│03│04│05│06│07│...│78│79│7A│7B│7C│7D│7E│7F┃
 *   ┠────┼──┼──┼──┼──┼──┼──┼──┼──┼───┼──┼──┼──┼──┼──┼──┼──┼──┨
 *   ┃Byte│80│81│82│83│84│85│86│87│...│F8│F9│FA│FB│FC│FD│FE│FF┃
 *   ┗━━━━┷━━┷━━┷━━┷━━┷━━┷━━┷━━┷━━┷━━━┷━━┷━━┷━━┷━━┷━━┷━━┷━━┷━━┛
 * ```
 *
 * So in the arrangement above, the least significant bit of byte 0 would have the position (x:0, y:0),
 * the most significant bit of byte 0 would have the position (x:0, y:7), the least significant bit of byte 1
 * would have the position (x:1, y:0), and so on. At byte 0x80, we would start on row 8, with the least
 * significant bit having the position (x:0, y:8).
 *
 * @param data The raw screen frame data
 * @param byteWidth The number of bytes per row (per column if you're thinking in portrait mode)
 */
function flipperFrameToPortrait(data: Uint8Array, byteWidth = 8): Uint8Array {
  const newData = new Uint8Array(data.length);
  const len = data.length / byteWidth;
  for (let i = 0; i < byteWidth; i++) {
    for (let j = 0; j < len; j++) {
      const fromIndex = i * len + j;
      const toIndex = byteWidth - i - 1 + j * byteWidth;
      const byte = data[fromIndex];
      newData[toIndex] = byte;
    }
  }
  return newData;
}

export class ScreenFrame {
  readonly data: Uint8Array;

  readonly width: number;
  readonly height: number;

  constructor(width?: number, height?: number, data?: Uint8Array);
  constructor(
    width?: number,
    height?: number,
    data?: ArrayBuffer | SharedArrayBuffer,
    offset?: number,
  );
  constructor(
    width = 64,
    height = 128,
    data?: ArrayBuffer | SharedArrayBuffer | Uint8Array,
    offset = 0,
  ) {
    if ((width & 0x07) > 0) {
      throw new Error('Width must be a multiple of 8');
    }
    const length = (width * height) >> 3;
    if (data) {
      if (data instanceof Uint8Array) {
        if (data.length < length) {
          throw new Error('Data length out of bounds');
        }
        this.data = data;
      } else {
        if (data.byteLength < offset + length) {
          throw new Error('Data offset out of bounds');
        }
        this.data = new Uint8Array(data, offset, length);
      }
    } else {
      this.data = new Uint8Array(length);
    }
    this.width = width;
    this.height = height;
  }

  static fromMessages(
    msg: { guiScreenFrame?: { data?: Uint8Array | null } | null }[],
    width = 64,
    height = 128,
  ) {
    if ((width & 0x07) > 0) {
      throw new Error('Width must be a multiple of 8');
    }
    const byteWidth = width >> 3;
    const chunks = msg.map((m) => {
      if (!m.guiScreenFrame || !m.guiScreenFrame.data) {
        throw new Error('Unexpected response content');
      }
      return m.guiScreenFrame.data;
    });
    const length = (width * height) >> 3;
    if (chunks.length === 1) {
      if (chunks[0].length === length) {
        const frameData = flipperFrameToPortrait(chunks[0], byteWidth);
        return new this(width, height, frameData.buffer, frameData.byteOffset);
      }
      console.warn(
        `Unexpected screen frame length. Expected ${length}, got ${chunks[0].length}`,
      );
    }
    const data = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    // const frameData = flipperFrameToPortrait(data, byteWidth);
    return new this(width, height, data.buffer, data.byteOffset);
  }

  getPixel(x: number, y: number): boolean {
    const bitIndex = x & 7;
    const byte = this.data[(x >> 3) + ((y * this.width) >> 3)];
    return ((byte >> (7 - bitIndex)) & 1) === 1;
  }

  setPixel(x: number, y: number, value: boolean): void {
    const bitIndex = x & 7;
    if (value) {
      this.data[(x >> 3) + ((y * this.width) >> 3)] |= 1 << (7 - bitIndex);
    } else {
      this.data[(x >> 3) + ((y * this.width) >> 3)] &= ~(1 << (7 - bitIndex));
    }
  }

  getRow(y: number): Uint8Array {
    const byteWidth = this.width >> 3;
    const start = y * byteWidth;
    return new Uint8Array(
      this.data.buffer,
      this.data.byteOffset + start,
      byteWidth,
    );
  }
}

export default ScreenFrame;
