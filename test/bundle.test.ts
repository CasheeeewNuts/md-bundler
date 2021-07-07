import * as fs from "fs";
import bundle from "../src/main";

describe('bundle test', () => {
  test('test.md', () => {
    const correct = fs.readFileSync('/home/nuts/Projects/ts/md-bundler/test/correct.md').toString();
    const output = bundle('/home/nuts/Projects/ts/md-bundler/test/test.md');

    expect(output).toMatch(correct)
  })
})