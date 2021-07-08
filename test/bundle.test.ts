import * as fs from "fs";
import bundle from "../src/main";

describe('bundle test', () => {
  test('test.md', () => {
    const correct = fs.readFileSync('./test/assets/correct.md').toString();
    const output = bundle('./test/assets/test.md');

    expect(output).toMatch(correct)
  })

  test('test2.md', () => {
    const correct = fs.readFileSync('./test/assets/correct.md').toString();
    const output = bundle('./test/assets/test2.md');

    expect(output).toMatch(correct)
  })
})