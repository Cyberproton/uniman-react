const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          assert: require.resolve('assert'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
        new CopyPlugin({
          patterns: [
            {
              // Copy the binary Oracle DB driver to dist.
              from: path.resolve(__dirname, 'node_modules/oracledb/build'),
              to: 'node_modules/oracledb/build',
            },
            {
              // Copy the binary Oracle DB driver to dist.
              from: path.resolve(
                __dirname,
                'node_modules/oracledb/build/Release',
              ),
              to: 'oracledb',
            },
          ],
        }),
      ],
    },
  },
};
