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
    'Len: %d\n%s',
    cnt,
    values.join(', ') /* .sort((a, b) => a - b) */,
  );
}

function printChains(mapping) {
  const chainMap = new Map();
  outer: for (let i = 0; i < mapping.length; i++) {
    let next = i;
    let cnt = 0;
    do {
      const old = next;
      if (!chainMap.has(old)) {
        chainMap.set(old, i);
      } else {
        console.log(`Chain ${i} is a duplicate of chain ${chainMap.get(old)}`);
        continue outer;
      }
      next = mapping[next];
      cnt++;
    } while (next !== i);
    console.log(`Chain ${i} length:`, cnt);
  }
  const chains = new Set(chainMap.values());
  for (const chain of chains) printChain(mapping, chain);
  console.log('Chain count:', chains.size);
}

function flipperFrameToPortrait(data, byteWidth) {
  const newData = new Uint8Array(data.length);
  const len = data.length >> Math.log2(byteWidth);
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

const width = 3;
const height = 3;

flipperFrameToPortrait(new Uint8Array(width * height), width);
