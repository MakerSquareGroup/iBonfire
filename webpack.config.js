module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname + '/client/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel", 
        query: { presets: ['es2015', 'react', 'stage-1'] }
      }
    ]
  }
}