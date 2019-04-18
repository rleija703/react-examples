const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'js',
  'ts',
  'tsx',
  'json',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appPublic: resolveApp('public'),
  appBuild: resolveApp('build'),
  appHtml: resolveApp('public/index.html'),
  appSrc: resolveApp('src'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
}

module.exports.moduleFileExtensions = moduleFileExtensions;