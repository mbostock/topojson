const rollup = require("rollup");
const dependencies = require("./package.json").dependencies;

// see below for details on the options
const inputOptions = {
  input: "index.js",
  external: Object.keys(dependencies)
};
const outputOptions = {
  file: "dist/topojson.node.js",
  format: "cjs"
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.watchFiles); // an array of file names this bundle depends on

  // generate code
  const { output } = await bundle.generate(outputOptions);

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === "chunk") {
      console.log(chunkOrAsset.fileName);
      console.log(chunkOrAsset.exports);
    }
  }

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
