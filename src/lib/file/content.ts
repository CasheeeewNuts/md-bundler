import ReadableInterface = MarkDownBundler.ReadableInterface;


export class Content implements ReadableInterface {
  private readonly content: Buffer;

  constructor(content: Buffer) {
    this.content = content;
  }

  read(): Buffer {
    return this.content;
  }
}