import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlogPostListComponent } from './components/blog-post-list/blog-post-list.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { BlogPostCategoryMenuComponent } from './components/blog-post-category-menu/blog-post-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { BlogPostDetailsComponent } from './components/blog-post-details/blog-post-details.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {path:'blogPosts/:id', component: BlogPostDetailsComponent},
  {path:'search/:keyword', component: BlogPostListComponent},
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
    BlogPostCategoryMenuComponent,
    SearchComponent,
    BlogPostDetailsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
