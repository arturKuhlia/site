import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { ExcerptPipe } from './customPipes/excerpt.pipe';
import { SlugPipe } from './customPipes/slug.pipe';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogComponent } from './components/blog/blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorComponent } from './components/paginator/paginator.component'
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AngularFireAuthModule } from "@angular/fire/auth"
import { AuthGuard } from './guards/auth.guard';
import { ScrollerComponent } from './components/scroller/scroller.component';
import { CommentsComponent } from './components/comments/comments.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BlogEditorComponent,
    ExcerptPipe,
    SlugPipe,
    BlogCardComponent,
    BlogComponent,
    PaginatorComponent,
    ScrollerComponent,
    CommentsComponent,


  ],
  imports: [
    AngularFireAuthModule,
    NgxPaginationModule,
    CKEditorModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    RouterModule.forRoot([
      { path: 'editpost/:id', component: BlogEditorComponent, canActivate:
[AdminAuthGuard] },
      { path: 'addpost', component: BlogEditorComponent, canActivate:
[AuthGuard] },
      { path: 'page/:pagenum', component: HomeComponent },
      { path: 'editpost/:id', component: BlogEditorComponent },
      { path: 'blog/:id/:slug', component: BlogComponent },
      { path: 'addpost', component: BlogEditorComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', component: HomeComponent }

    ]),
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {


}
