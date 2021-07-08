import {MarkDownFile} from "../src/lib/file/mark-down-file";
import {getRoot} from "../src/lib/util/file-tree";


describe('test file-tree utility functions', () => {
  describe('getRoot()', () => {
    /*
     * this tree structure is next...
     *
     * root ---- a ---- b
     *  |        |----- c
     *  |
     *  |------- d
     *
     */
    const root = new MarkDownFile('./test/correct.md');
    const a = new MarkDownFile('./test/1.md', root);
    const b = new MarkDownFile('./test/2.md', a);
    const c = new MarkDownFile('./test/3.md', a);
    const d = new MarkDownFile('./test/4.md', root);

    const otherRoot = new MarkDownFile('./test/test.md');
    const otherA = new MarkDownFile('./test/test2.md', otherRoot)

    test('normal', () => {
      expect(getRoot(a)).toBe<MarkDownFile>(root);
      expect(getRoot(b)).toBe<MarkDownFile>(root);
      expect(getRoot(c)).toBe<MarkDownFile>(root);
      expect(getRoot(d)).toBe<MarkDownFile>(root);
    })

    test('provide other tree node', () => {
      expect(getRoot(otherRoot)).not.toBe(root);
      expect(getRoot(otherA)).not.toBe(root);
    })
  });
})