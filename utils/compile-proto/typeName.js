export default function typeName(o) {
  if (o === null) return 'null';
  if (typeof o === 'object') {
    return Object.prototype.toString.call(o);
  }
  if (typeof o === 'boolean') {
    return `boolean(${o})`;
  }
  if (typeof o === 'number') {
    return `number(${o})`;
  }
  if (typeof o === 'bigint') {
    return `bigint(${o})`;
  }
  if (typeof o === 'symbol') {
    return `Symbol(${o.description} ?? '')`;
  }
  return typeof o;
}
