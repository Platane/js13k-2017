const { parse } = require('markdown-tocomprehensivedata')

module.exports = content => `module.exports = ${JSON.stringify(parse(content))}`
