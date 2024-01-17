const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const IS_ANALYZER = process.env.IS_ANALYZER === 'true';

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: [options.entry],
    externals: [
      ...options.externals,
      // 빌드가 되지 않는 문제 해결
      // https://github.com/nestjs/nest-cli/issues/1341#issuecomment-1627368760
      // eslint-disable-next-line consistent-return
      ({ request }, callback) => {
        if (/@nestjs\/websockets/.test(request) || /@nestjs\/microservices/.test(request)) {
          return callback(null, `commonjs ${request}`);
        }

        callback();
      },
    ],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [...options.plugins, IS_ANALYZER && new BundleAnalyzerPlugin()].filter(Boolean),
  };
};
