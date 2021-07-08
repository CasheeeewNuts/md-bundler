import * as fs from "fs";
import path from "path";


const TAG_REGEX = /^!\[(.+)]/;

export default function (filePath: string) {
  let buffer: Buffer = Buffer.alloc(0);

  const rootFile = fs.readFileSync(filePath);
  const rootFileDirectory = path.dirname(filePath);

  rootFile.toString().split('\n').forEach(line => {
    if (!line.match(TAG_REGEX)) {
      buffer.write(line);
      return;
    }

    const includeFilePath = line.replace(TAG_REGEX, '$1');
    const resolvedIncludeFilePath = path.isAbsolute(includeFilePath)
        ? includeFilePath
        : path.resolve(rootFileDirectory, includeFilePath);

    buffer = Buffer.concat([buffer, fs.readFileSync(resolvedIncludeFilePath), Buffer.from('\n')]);
  })

  return buffer.toString();
}