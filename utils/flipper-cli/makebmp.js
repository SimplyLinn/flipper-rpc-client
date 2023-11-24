import fs from 'node:fs/promises';

const pixelData = await fs.readFile('./frame.bin');

const BMP_HEADER_SIZE = 14;

const BMP_INFO_HEADER_SIZE = 40;

const COLOR_TABLE_SIZE = 8;

const FULL_SIZE =
  BMP_HEADER_SIZE + BMP_INFO_HEADER_SIZE + COLOR_TABLE_SIZE + pixelData.length;

const WIDTH = 128;
const HEIGHT = 64;

const BMP_HEADER = new Uint8Array([
  0x42,
  0x4d, // BM
  FULL_SIZE & 0xff,
  (FULL_SIZE >> 8) & 0xff,
  (FULL_SIZE >> 16) & 0xff,
  (FULL_SIZE >> 24) & 0xff,
  0x00, // Reserved
  0x00,
  0x00,
  0x00,
  (BMP_HEADER_SIZE + BMP_INFO_HEADER_SIZE + COLOR_TABLE_SIZE) & 0xff,
  ((BMP_HEADER_SIZE + BMP_INFO_HEADER_SIZE + COLOR_TABLE_SIZE) >> 8) & 0xff,
  ((BMP_HEADER_SIZE + BMP_INFO_HEADER_SIZE + COLOR_TABLE_SIZE) >> 16) & 0xff,
  ((BMP_HEADER_SIZE + BMP_INFO_HEADER_SIZE + COLOR_TABLE_SIZE) >> 24) & 0xff,
]);

const BMP_INFO_HEADER = new Uint8Array([
  BMP_INFO_HEADER_SIZE & 0xff,
  (BMP_INFO_HEADER_SIZE >> 8) & 0xff,
  (BMP_INFO_HEADER_SIZE >> 16) & 0xff,
  (BMP_INFO_HEADER_SIZE >> 24) & 0xff,
  WIDTH & 0xff,
  (WIDTH >> 8) & 0xff,
  (WIDTH >> 16) & 0xff,
  (WIDTH >> 24) & 0xff,
  HEIGHT & 0xff,
  (HEIGHT >> 8) & 0xff,
  (HEIGHT >> 16) & 0xff,
  (HEIGHT >> 24) & 0xff,
  0x01, // Color planes
  0x00,
  0x01, // Bits per pixel
  0x00,
  0x00, // Compression
  0x00,
  0x00,
  0x00,
  0x00, // Image size
  0x00,
  0x00,
  0x00,
  0x00, // X pixels per meter
  0x00,
  0x00,
  0x00,
  0x00, // Y pixels per meter
  0x00,
  0x00,
  0x00,
  0x02, // Total colors
  0x00,
  0x00,
  0x00,
  0x00, // Important colors
  0x00,
  0x00,
  0x00,
]);

const COLOR_TABLE = new Uint8Array([
  0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00,
]);

console.log(BMP_HEADER.length);
console.log(BMP_INFO_HEADER.length);
console.log(COLOR_TABLE.length);
console.log(pixelData.length);

const combined = new Uint8Array(
  BMP_HEADER.length +
    BMP_INFO_HEADER.length +
    COLOR_TABLE.length +
    pixelData.length,
);

combined.set(BMP_HEADER);
combined.set(BMP_INFO_HEADER, BMP_HEADER.length);
combined.set(COLOR_TABLE, BMP_HEADER.length + BMP_INFO_HEADER.length);
combined.set(
  pixelData,
  BMP_HEADER.length + BMP_INFO_HEADER.length + COLOR_TABLE.length,
);

fs.writeFile('./frame.bmp', combined).catch(console.error);
