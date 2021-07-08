declare namespace MarkDownBundler {
  interface ReadableInterface {
    read(): Buffer,
  }

  interface FileInterface extends ReadableInterface{
    plainPath: string,
    absolutePath: string,
    dirname: string
    basename: string,
    extension: string
    parent?: FileInterface,
    chunks: ReadableInterface[]
  }

  interface MarkDownFileInterface extends FileInterface {
    parent?: MarkDownFileInterface
  }
}