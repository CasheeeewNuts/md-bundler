import Path from "path";
import {program} from "commander";
import {createWriteStream} from "fs";
import {bundle} from "./core/bundle";


export default function main() {
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


function init() {
  program.version('0.2.0')
      .usage('[options] source_file [target_file]')
      .parse(process.argv);
}

function exitAfterShowUsage() {
  program.outputHelp()
  process.exit();
}