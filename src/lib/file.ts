import Path, {ParsedPath} from "path";
import FileInterface = MarkDownBundler.FileInterface;
import Fs from "fs";


export abstract class File implements FileInterface {
  plainPath: string;
  absolutePath: string;
  dirname: string;
  basename: string;
  extension: string;
  abstract parent?: FileInterface;
  children: MarkDownBundler.ReadableInterface[] = [];


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
  }


  private resolveAbsolutePath() {
    if (Path.isAbsolute(this.plainPath)) {
      return this.plainPath;
    }

    if (this.parent != null) {
      return Path.resolve(this.parent.absolutePath, this.plainPath);
    }

    return Path.resolve(process.cwd(), this.plainPath);
  }


  public exists(): boolean {
    return Fs.existsSync(this.absolutePath);
  }


  public read(): Buffer {
    return Fs.readFileSync(this.absolutePath);
  }

}