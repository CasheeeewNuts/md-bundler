import FileInterface = MarkDownBundler.FileInterface;


export function getRoot(file: FileInterface): FileInterface {
  while (file.parent != null) {
    file = file.parent
  }

  return  file;
}