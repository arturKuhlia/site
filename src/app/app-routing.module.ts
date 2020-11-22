import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';



@NgModule({
  imports: [
    RouterModule.forRoot([{ path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'page/:pagenum', component: HomeComponent },
    { path: 'addpost', component: BlogEditorComponent, canActivate: [AuthGuard] },
    { path: 'editpost/:id', component: BlogEditorComponent, canActivate: [AdminAuthGuard] },
    { path: 'blog/:id/:slug', component: BlogComponent },
    { path: '**', component: HomeComponent }])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
