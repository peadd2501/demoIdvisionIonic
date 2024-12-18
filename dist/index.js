// Exportar componentes
export * from './src/app/pages/id-vision/components/camara-video-selfie/camara-video-selfie.component';
export * from './src/app/pages/id-vision/components/camera-with-overlay/camera-with-overlay.component';
export * from './src/app/pages/id-vision/components/custom-slide/custom-slide.component';
export * from './src/app/pages/id-vision/id-vision.component';
export * from './src/app/pages/id-vision/id-vision.module';
// Exportar servicios
export * from './src/app/pages/id-vision/services/dpi/dpi-service.service';
export * from './src/app/pages/id-vision/services/modal-services/modal-dpi-services';
export * from './src/app/pages/id-vision/services/modal-services/modal-video-selfie-services';
export * from './src/app/pages/id-vision/services/modal-services/sdk-communication-services';
export * from './src/app/pages/id-vision/services/validate-meta-g/validate-meta-g';
// Detectar si se ejecuta en Node.js
// if (typeof process !== 'undefined' && process.versions && process.versions.node) {
//   const path = require('path');
//   const fse = require('fs-extra');
//   const distImagesPath = path.resolve(__dirname, '../dist/assets/imagesIdvision');
//   const projectAssetsPath = path.resolve(process.cwd(), './src/assets/imagesIdvision');
//   const distThemePath = path.resolve(__dirname, '../src/theme/variables.scss');
//   const projectThemePath = path.resolve(process.cwd(), './src/theme/variables.scss');
//   (async () => {
//     try {
//       console.log('--- Iniciando postinstall ---');
//       if (await fse.pathExists(distImagesPath)) {
//         await fse.ensureDir(projectAssetsPath);
//         await fse.copy(distImagesPath, projectAssetsPath);
//         console.log(`✅ Assets copiados a: ${projectAssetsPath}`);
//       } else {
//         console.warn(`⚠️ No se encontraron archivos en: ${distImagesPath}`);
//       }
//       if (await fse.pathExists(distThemePath)) {
//         await fse.ensureDir(path.dirname(projectThemePath));
//         await fse.copyFile(distThemePath, projectThemePath);
//         console.log(`✅ Archivo theme copiado a: ${projectThemePath}`);
//       } else {
//         console.warn(`⚠️ No se encontró el archivo theme en: ${distThemePath}`);
//       }
//     } catch (error) {
//       console.error('❌ Error durante el postinstall:', error);
//     }
//   })();
// } else {
//   console.log('🚫 Este script está diseñado solo para ejecutarse en Node.js');
// }
// import * as path from 'path';
// import * as fse from 'fs-extra';
// // Rutas
// const distImagesPath = path.resolve(__dirname, './assets/imagesIdvision');
// const projectAssetsPath = path.resolve(process.cwd(), './src/assets/imagesIdvision');
// const distThemePath = path.resolve(__dirname, './theme/variables.scss');
// const projectThemePath = path.resolve(process.cwd(), './src/theme/variables.scss');
// // Ejecutar lógica al cargar el módulo
// (async () => {
//   try {
//     // Verificar que los archivos existen en el paquete
//     if (!fse.existsSync(distImagesPath)) {
//       console.error('No se encontraron los archivos en el paquete:', distImagesPath);
//       return;
//     }
//     // Crear carpeta assets en el proyecto si no existe
//     await fse.ensureDir(projectAssetsPath);
//     await fse.copy(distImagesPath, projectAssetsPath);
//     console.log('Assets copiados correctamente en:', projectAssetsPath);
//     // Crear carpeta theme en el proyecto si no existe
//     await fse.ensureDir(path.dirname(projectThemePath));
//     await fse.copyFile(distThemePath, projectThemePath);
//     console.log('Archivo de theme copiado correctamente en:', projectThemePath);
//   } catch (err) {
//     console.error('Error durante la configuración del SDK:', err);
//   }
// })();
//# sourceMappingURL=index.js.map