import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlogPostListComponent } from './components/blog-post-list/blog-post-list.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path:'category/:id', component: BlogPostListComponent},
  {path:'category', component: BlogPostListComponent},
  {path:'blogPosts', component: BlogPostListComponent},
  {path:'', redirectTo: '/blogPosts', pathMatch: 'full'},
  {path:'**', redirectTo: '/blogPosts', pathMatch: 'full'},
];


@NgModule({
  declarations: [
    AppComponent,
    BlogPostListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
