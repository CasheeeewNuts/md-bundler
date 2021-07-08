import * as fs from "fs";
import bundle from "../src/main";

describe('bundle test', () => {
  test('test.md', () => {
    const correct = fs.readFileSync('./test/correct.md').toString();
    const output = bundle('./test/test.md');

    expect(output).toMatch(correct)
  })
})