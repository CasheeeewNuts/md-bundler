import Path from "path";
import fs from "fs";
import stream from "stream";
import {resolve} from "../lib/util/path";


export function bundle(entrypoint: string, output?: stream.Transform) {
  if (!Path.isAbsolute(entrypoint)) {
    throw 'entrypoint is need to absolute'
  }

  const tag = /!\[(.+)]/;
  const buffer: stream.Transform = output ?? new stream.Transform({
    transform(chunk: any, encoding: BufferEncoding, done: stream.TransformCallback) {
      this.push(chunk);
      done();
    },
    highWaterMark: 100_000
  });

  const transform = new stream.Transform({
    transform(chunk: Buffer, encoding: BufferEncoding, done: stream.TransformCallback) {
      const lines = chunk.toString().split('\n');

      lines.forEach(line => {
        if (!tag.test(line)) {
          this.push(`${line}\n`);

          return;
        }

        const path = resolve(line.replace(tag, '$1'), entrypoint);
        const child = fs.readFileSync(path);

        buffer.write(`${child}\n`);
      });

      done();
    }
  })

  const source = fs.createReadStream(entrypoint);
  return source.pipe(transform).pipe(buffer)
}

bundle('/Users/nuts/Project/md-bundler/test/assets/test.md').pipe(process.stdout)