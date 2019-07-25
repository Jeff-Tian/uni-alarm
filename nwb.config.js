module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  webpack: {
    config(config) {
      config.entry = {
        demo: ['./demo/src/index.tsx'],
      }
      config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx']
      config.module.rules.push({
        'test': /\.tsx?$/,
        'loader': 'awesome-typescript-loader',
      },{
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    })

      return config
    },
  },
}
