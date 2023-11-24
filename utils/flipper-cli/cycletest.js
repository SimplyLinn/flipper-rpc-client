function printChain(mapping, chain) {
  let next = chain;
  let cnt = 0;
  const values = [];
  do {
    values.push(next);
    next = mapping[next];
    cnt++;
  } while (next !== chain);
  console.log(
    'Len: %d\n%s\n%s',
    cnt,
    `${Math.min(...values)} - ${Math.max(...values)}`,
    values.join(', ') /* .sort((a, b) => a - b) */,
  );
}

function printChains(mapping) {
  const chainMap = new Map();
  outer: for (let i = 0; i < mapping.length; i++) {
    let next = i;
    do {
      const old = next;
      if (!chainMap.has(old)) {
        chainMap.set(old, i);
      } else {
        continue outer;
      }
      next = mapping[next];
    } while (next !== i);
  }
  const chains = new Set(chainMap.values());
  for (const chain of chains) printChain(mapping, chain);
  console.log('Chain count:', chains.size);
}

function flipperFrameToPortrait(data, byteWidth) {
  const newData = new Uint8Array(data.length);
  const len = data.length / byteWidth;
  const mapping = new Uint16Array(data.length);
  for (let i = 0; i < byteWidth; i++) {
    for (let j = 0; j < len; j++) {
      const fromIndex = i * len + j;
      const toIndex = byteWidth - i - 1 + j * byteWidth;
      mapping[fromIndex] = toIndex;
      const byte = data[fromIndex];
      newData[toIndex] = byte;
    }
  }
  printChains(mapping);
  return newData;
}

/*
const width = 2;
const height = 4;

console.log(
  '%d x %d\n%s',
  width,
  height,
  '='.repeat(width.toString().length + height.toString().length + 3),
);

flipperFrameToPortrait(new Uint8Array(width * height), width);
console.log();

process.exit();
*/

for (let i = 1; i <= 10; i += 1) {
  const width = i;
  const height = 16;

  console.log(
    '%d x %d\n%s',
    width,
    height,
    '='.repeat(width.toString().length + height.toString().length + 3),
  );

  flipperFrameToPortrait(new Uint8Array(width * height), width);
  console.log();
}
