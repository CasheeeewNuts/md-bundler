import Path, {ParsedPath} from "path";
import Fs from "fs";
import {Content} from "./content";
import FileInterface = MarkDownBundler.FileInterface;
import ReadableInterface = MarkDownBundler.ReadableInterface;


export abstract class File implements FileInterface {
  plainPath: string;
  absolutePath: string;
  dirname: string;
  basename: string;
  extension: string;
  abstract parent?: FileInterface;
  chunks: MarkDownBundler.ReadableInterface[] = [];


  protected constructor(path: string) {
    this.plainPath = path;
    this.absolutePath = this.resolveAbsolutePath();
    const parsed: ParsedPath = Path.parse(this.absolutePath);

    this.dirname = parsed.dir;
    this.basename = parsed.base;
    this.extension = parsed.ext;

    if (!this.exists()) {
      throw `file ${this.basename} is not exists in directory (${this.dirname})`;
    }

    this.load();
  }


  public exists(): boolean {
    return Fs.existsSync(this.absolutePath);
  }


  public read(): Buffer {
    if (this.chunks.length === 0) {
      return Buffer.alloc(0, 0);
    }

    return this.chunks.reduce((bundled: Buffer, readable: ReadableInterface) => {
      return Buffer.concat([bundled, readable.read()])
    }, Buffer.allocUnsafe(0));
  }


  protected setParent(parent: FileInterface): void {
    this.parent = parent;
    parent.chunks.push(this);
  }


  private load(): void {
    const content: Content = new Content(Fs.readFileSync(this.absolutePath));

    this.chunks.push(content)
  }


  private resolveAbsolutePath(): string {
    if (Path.isAbsolute(this.plainPath)) {
      return this.plainPath;
    }

    if (this.parent != null) {
      return Path.resolve(this.parent.absolutePath, this.plainPath);
    }

    return Path.resolve(process.cwd(), this.plainPath);
  }
}