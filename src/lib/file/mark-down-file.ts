import MarkDownFileInterface = MarkDownBundler.MarkDownFileInterface;

import {File} from "./file"


export class MarkDownFile extends File implements MarkDownFileInterface {
  parent?: MarkDownFile;

  constructor(path: string, parent?: MarkDownFile) {
    super(path);

    if (this.extension !== '.md') {
      throw 'read file is not markdown file'
    }

    if (parent != null) {
      this.setParent(parent);
    }
  }
}