import Path from "path";
import {program} from "commander";
import {createWriteStream} from "fs";
import {bundle} from "./core/bundle";


main();


function main(): void {
  init();

  const [path, outputFileName] = program.args;

  if (path == null) {
    exitAfterShowUsage();
  }

  const entrypoint = Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path);
  const output = outputFileName != null ? createWriteStream(outputFileName) : process.stdout;

  const stream = bundle(entrypoint);

  stream.on('error', () => {
    if (output !== process.stdout) {
      output.destroy();
    }
  });

  stream.pipe(output);
}


function init(): void {
  program.version('0.2.0')
      .usage("[options] source_file [target_file]\nif don't pass argument target_file, output bundled to stdout")
      .parse(process.argv);
}


function exitAfterShowUsage(): void {
  program.outputHelp()
  process.exit();
}