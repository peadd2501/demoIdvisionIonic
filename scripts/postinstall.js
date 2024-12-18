if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  const path = require('path');
  const fse = require('fs-extra');

  const distImagesPath = path.resolve(__dirname, '../dist/assets/imagesIdvision');
  const projectAssetsPath = path.resolve(process.cwd(), './src/assets/imagesIdvision');
  const distThemePath = path.resolve(__dirname, '../src/theme/variables.scss');
  const projectThemePath = path.resolve(process.cwd(), './src/theme/variables.scss');

  (async () => {
    try {
      console.log('--- Iniciando postinstall ---');

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

// const path = require('path');
// const fse = require('fs-extra');

// // Rutas absolutas en el paquete (origen)
// const distImagesPath = path.resolve(__dirname, '../dist/assets/imagesIdvision');
// const distThemePath = path.resolve(__dirname, '../src/theme/variables.scss');

// // Rutas absolutas en el proyecto consumidor (destino)
// const projectDir = process.env.INIT_CWD || process.cwd(); // INIT_CWD apunta al proyecto consumidor
// const projectAssetsPath = path.resolve(projectDir, './src/assets/imagesIdvision');
// const projectThemePath = path.resolve(projectDir, './src/theme/variables.scss');

// (async () => {
//   try {
//     console.log('--- Iniciando postinstall ---');
//     console.log('Origen - Assets:', distImagesPath);
//     console.log('Destino - Assets:', projectAssetsPath);
//     console.log('Origen - Theme:', distThemePath);
//     console.log('Destino - Theme:', projectThemePath);

//     // Verificar y copiar assets
//     if (await fse.pathExists(distImagesPath)) {
//       await fse.ensureDir(projectAssetsPath);
//       await fse.copy(distImagesPath, projectAssetsPath, { overwrite: true });
//       console.log(`✅ Assets copiados a: ${projectAssetsPath}`);
//     } else {
//       console.warn(`⚠️ No se encontraron archivos de assets en: ${distImagesPath}`);
//     }

//     // Verificar y copiar theme
//     if (await fse.pathExists(distThemePath)) {
//       await fse.ensureDir(path.dirname(projectThemePath));
//       await fse.copyFile(distThemePath, projectThemePath);
//       console.log(`✅ Archivo de theme copiado a: ${projectThemePath}`);
//     } else {
//       console.warn(`⚠️ No se encontró el archivo de theme en: ${distThemePath}`);
//     }
//   } catch (error) {
//     console.error('❌ Error durante la copia de archivos:', error);
//     process.exit(1); // Falla la instalación si ocurre un error
//   }
// })();
