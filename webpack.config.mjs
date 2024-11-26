// ts-check
import path from 'node:path';

/**
 * builds webpack config
 * @param {!string} outputPath output path
 * @returns {!import("webpack").Configuration}
 */
function buildWebpackConfig(outputPath) {
  return {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    experiments: {
      outputModule: true,
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.esm.json',
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: 'index.js',
      library: {
        type: 'module',
      },
      path: outputPath,
    },
    stats: 'verbose',
  };
}

const outputPath = path.resolve(import.meta.dirname, 'lib/esm');

/** @type {!import("webpack").Configuration} */
export default {
  ...buildWebpackConfig(outputPath),
  externals: ['inversify', 'reflect-metadata'],
};
