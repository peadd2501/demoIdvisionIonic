if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  const path = require('path');
  const fse = require('fs-extra');

  const distImagesPath = path.resolve(__dirname, '../dist/assets/imagesIdvision');
  const projectAssetsPath = path.resolve(process.cwd(), './src/assets/imagesIdvision');
  const distThemePath = path.resolve(__dirname, '../src/theme/variables.scss');
  const projectThemePath = path.resolve(process.cwd(), './src/theme/variables.scss');

  (async () => {
    try {
      if (await fse.pathExists(distImagesPath)) {
        await fse.ensureDir(projectAssetsPath);
        await fse.copy(distImagesPath, projectAssetsPath);
        console.log(`✅ Assets copiados a: ${projectAssetsPath}`);
      } else {
        console.warn(`⚠️ No se encontraron archivos en: ${distImagesPath}`);
      }

      if (await fse.pathExists(distThemePath)) {
        await fse.ensureDir(path.dirname(projectThemePath));
        await fse.copyFile(distThemePath, projectThemePath);
        console.log(`✅ Archivo theme copiado a: ${projectThemePath}`);
      } else {
        console.warn(`⚠️ No se encontró el archivo theme en: ${distThemePath}`);
      }
    } catch (error) {
      console.error('❌ Error durante el postinstall:', error);
    }
  })();
} else {
  console.log('🚫 Este script está diseñado solo para ejecutarse en Node.js');
}