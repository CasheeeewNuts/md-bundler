import {MarkDownFile} from "../src/lib/file/mark-down-file";


describe('Test MarkDownFile class', () => {
  test('input valid absolute path', () => {
    const file = new MarkDownFile('/Users/nuts/Project/md-bundler/test/correct.md');

    expect(file.plainPath).toMatch('/Users/nuts/Project/md-bundler/test/correct.md')
    expect(file.absolutePath).toMatch('/Users/nuts/Project/md-bundler/test/correct.md')
    expect(file.dirname).toMatch('/Users/nuts/Project/md-bundler/test')
    expect(file.basename).toMatch('correct.md')
    expect(file.extension).toMatch('.md')
    expect(file.parent).toEqual(undefined)
    expect(file.children).toEqual([])
  });

  test('input valid relative path', () => {
    const file = new MarkDownFile('./test/correct.md');

    expect(file.plainPath).toMatch('./test/correct.md')
    expect(file.absolutePath).toMatch('/Users/nuts/Project/md-bundler/test/correct.md')
    expect(file.dirname).toMatch('/Users/nuts/Project/md-bundler/test')
    expect(file.basename).toMatch('correct.md')
    expect(file.extension).toMatch('.md')
    expect(file.parent).toEqual(undefined)
    expect(file.children).toEqual([])
  });

  test('input valid relative path with parent', () => {
    const parent = new MarkDownFile('./test/correct.md');
    const child = new MarkDownFile('./test/test.md', parent);

    expect(child.plainPath).toMatch('./test/test.md')
    expect(child.absolutePath).toMatch('/Users/nuts/Project/md-bundler/test/test.md')
    expect(child.dirname).toMatch('/Users/nuts/Project/md-bundler/test')
    expect(child.basename).toMatch('test.md')
    expect(child.extension).toMatch('.md')
    expect(child.parent).toEqual<MarkDownFile>(parent)
    expect(child.children).toEqual([])
  });

  test('input invalid absolute path', () => {
    expect(() => new MarkDownFile('./correct.md')).toThrow('file correct.md is not exists in directory (/Users/nuts/Project/md-bundler)')
  });

  test('input invalid extension file name', () => {
    expect(() => new MarkDownFile('./test/correct.mp')).toThrow('read file is not markdown file')
  });
});