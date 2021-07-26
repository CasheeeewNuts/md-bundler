# md-bundler

md-bundler is a CLI tool for bundling markdown files by specify syntax.

## Install

install with npm
```bash
npm i md-bundler
```

install with yarn
```bash
yarn add md-bundler
```

## Usage
Bundle markdown file
```bash
mdb sample.md // output bundled data to stdout
```

In a typical usecase, you would save the bundled file with a specific name.
This can be archived with following example.
```bash
mdb sample.md output.md // output bundled data to output.md
```

In order to bundle other markdown files, you have to write by following syntax.
```
// in sample.md...
Content
.
.
.

![./bundled.md] // absolute path or relative path from bundling file's directory
```



