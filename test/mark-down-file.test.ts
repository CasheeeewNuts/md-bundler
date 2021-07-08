import {MarkDownFile} from "../src/lib/file/mark-down-file";
import * as fs from "fs";
import {Content} from "../src/lib/file/content";


describe('Test MarkDownFile class', () => {
  test('input valid absolute path', () => {
    const file = new MarkDownFile('/Users/nuts/Project/md-bundler/test/assets/correct.md');

    expect(file.plainPath).toMatch('/Users/nuts/Project/md-bundler/test/assets/correct.md')
    expect(file.absolutePath).toMatch('/Users/nuts/Project/md-bundler/test/assets/correct.md')
    expect(file.dirname).toMatch('/Users/nuts/Project/md-bundler/test')
    expect(file.basename).toMatch('correct.md')
    expect(file.extension).toMatch('.md')
    expect(file.parent).toEqual(undefined)
    expect(file.chunks).toEqual([new Content(fs.readFileSync(file.absolutePath))])
  });

  test('input valid relative path', () => {
    const file = new MarkDownFile('./test/assets/correct.md');

    expect(file.plainPath).toMatch('./test/assets/correct.md')
    expect(file.absolutePath).toMatch('/Users/nuts/Project/md-bundler/test/assets/correct.md')
    expect(file.dirname).toMatch('/Users/nuts/Project/md-bundler/test')
    expect(file.basename).toMatch('correct.md')
    expect(file.extension).toMatch('.md')
    expect(file.parent).toEqual(undefined)
    expect(file.chunks).toEqual([new Content(fs.readFileSync(file.absolutePath))])
  });

  test('input valid relative path with parent', () => {
    const parent = new MarkDownFile('./test/assets/correct.md');
    const child = new MarkDownFile('./test/assets/test.md', parent);

    expect(child.plainPath).toMatch('./test/assets/test.md')
    expect(child.absolutePath).toMatch('/Users/nuts/Project/md-bundler/test/assets/test.md')
    expect(child.dirname).toMatch('/Users/nuts/Project/md-bundler/test')
    expect(child.basename).toMatch('test.md')
    expect(child.extension).toMatch('.md')
    expect(child.parent).toEqual<MarkDownFile>(parent)
    expect(child.chunks).toEqual([new Content(fs.readFileSync(child.absolutePath))])
  });

  test('input invalid absolute path', () => {
    expect(() => new MarkDownFile('./correct.md')).toThrow('file correct.md is not exists in directory (/Users/nuts/Project/md-bundler)')
  });

  test('input invalid extension file name', () => {
    expect(() => new MarkDownFile('./test/assets/correct.mp')).toThrow('read file is not markdown file')
  });
});