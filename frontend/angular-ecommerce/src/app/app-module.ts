import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ProductService } from './services/product';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'category/:id', component: ProductList },
  { path: 'category', component: ProductList },
  { path: 'products', component: ProductList },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [App, ProductList],
  imports: [RouterModule.forRoot(routes), BrowserModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    ProductService,
  ],
  bootstrap: [App],
})
export class AppModule {}
