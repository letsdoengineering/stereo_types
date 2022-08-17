// // gatsby-config.js configures various plugins that adapt the tools we use to the gatsby framework
// const path = require('path')
// // Get paths of Gatsby's required rules, which as of writing is located at:
// // https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/gatsby/src/utils/eslint-rules
// const gatsbyRequiredRules = path.join(
//   process.cwd(),
//   'node_modules',
//   'gatsby',
//   'dist',
//   'utils',
//   'eslint-rules'
// )
//
// require('dotenv').config({
//   path: '.env',
// })
//
// module.exports = {
//   siteMetadata: {
//     siteUrl: 'http://localhost:3000',
//     title: 'littleSurvey',
//   },
//   plugins: [
//     'gatsby-plugin-react-helmet',
//     'gatsby-plugin-sitemap',
//     {
//       resolve: `gatsby-plugin-typescript`,
//       options: {
//         isTSX: true, // defaults to false
//         jsxPragma: `jsx`, // defaults to "React"
//         allExtensions: true, // defaults to false. isTSX: true requires this to be true also.
//       },
//     },
//     {
//       resolve: 'gatsby-plugin-manifest',
//       options: {
//         icon: 'src/images/icon.png',
//       },
//     },
//     {
//       resolve: 'gatsby-plugin-eslint',
//       options: {
//         // Gatsby required rules directory
//         rulePaths: [gatsbyRequiredRules],
//         stages: ['develop'],
//         extensions: ['js', 'jsx', 'ts', 'tsx'],
//         exclude: ['node_modules', '.cache', 'public'],
//         emitWarning: true,
//         failOnError: false,
//       },
//     },
//   ],
// }
