/* eslint-disable @typescript-eslint/consistent-type-definitions */
function fn1(a: number, b: string): boolean {
  return a.toFixed() !== b;
}

function fn2(...[a, b]: [a: number, b: string]): boolean {
  return a.toFixed() !== b;
}

const test = ['a', 'b', 'c'] as const;

type Keys = (typeof test)[number];

export type Mapped = {
  [key in Keys]: [key, number];
};

/** @unroll */ export type NotMapped = {
  a: ['a', number];
  b: ['b', number];
  c: ['c', number];
};

export type TemplateMapped<K extends PropertyKey> = {
  [key in K]: [key, number];
};

export interface TEST extends Mapped {
  d: 4;
}

// export type AAA = Mapped;
