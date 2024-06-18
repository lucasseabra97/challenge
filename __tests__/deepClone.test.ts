import { deepCopyArray } from "../src/main.js";

type NestedObject = { [key: string]: NestedObject | string | number | boolean | null | any};  // eslint-disable-line @typescript-eslint/no-explicit-any

describe('deepCopyArray function', () => {
  let originalArray: NestedObject[];
  let copiedArray: NestedObject[];

  beforeAll(() => {
    originalArray = [
      { a: 1, b: { c: 2, d: [3, 4, { e: 5 }] } },
      { f: 6, g: [7, { h: 8, i: [9, 10] }] }
    ];
    copiedArray = deepCopyArray(originalArray);
  });

  // Check if the copy is deep and not just a reference
  it('creates a deep copy of the input array', () => {
    expect(copiedArray).toEqual(originalArray);
    expect(copiedArray).not.toBe(originalArray);
  });

  // Check if modifying the copy doesn't affect the original
  it('does not modify the original array when the copied array is modified', () => {
    copiedArray[0].b.c = 42;
    copiedArray[1].g[1].h = 99;
    expect(originalArray[0].b.c).toBe(2);
    expect(originalArray[1].g[1].h).toBe(8);
  });
});
