import Path from "path";


export function resolve(path: string, parentPath: string) {
  if (Path.isAbsolute(path)) {
    return path;
  }

  const parentDir = Path.parse(parentPath).dir;

  return Path.resolve(parentDir, path);
}