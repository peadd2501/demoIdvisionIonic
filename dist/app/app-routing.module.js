import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'id-vision', loadComponent: () => import('./pages/id-vision/id-vision.component').then(m => m.IdVisionComponent) }
];
export class AppRoutingModule {
}
AppRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: AppRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AppRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.12", ngImport: i0, type: AppRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
AppRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: AppRoutingModule, imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.12", ngImport: i0, type: AppRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
                    ],
                    exports: [RouterModule]
                }]
        }] });
//# sourceMappingURL=app-routing.module.js.map