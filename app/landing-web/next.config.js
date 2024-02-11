/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
  },

  // Recommended for the `pages` directory, default in `app`.
  experimental: {
    appDir: true,
    reactRoot: 'concurrent',
  },

  images: {},
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // audio support
    config.module.rules.push({
      exclude: config.exclude,
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            esModule: config.esModule || false,
            fallback: require.resolve('file-loader'),
            limit: config.inlineImageLimit,
            name: '[name]-[hash].[ext]',
            outputPath: `${isServer ? '../' : ''}static/images/`,
            publicPath: `${config.assetPrefix}/_next/static/images/`,
          },
        },
      ],
    });

    // shader support
    config.module.rules.push({
      exclude: /node_modules/,
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
};

module.exports = nextConfig;
