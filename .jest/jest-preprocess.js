const babelOptions = {
    presets: ['babel-preset-gatsby', '@babel/preset-typescript'], // pre-process files for jest - gatsby and typescript
}

module.exports = require('babel-jest').default.createTransformer(babelOptions)
