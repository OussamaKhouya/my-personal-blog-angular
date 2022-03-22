import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map,Observable} from "rxjs";
import {BlogPost} from "../common/blog-post"
import {BlogPostCategory} from "../common/blog-post-category";



@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private baseUrl = "http://localhost:8082/api/blogPosts"

  private categoryUrl = "http://localhost:8082/api/blogPost-category"

  constructor(private httpClient: HttpClient) { }

  getblogPostList(theCategoryId: number): Observable<BlogPost[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseBlogPost>(searchUrl).pipe(
      map(response => response._embedded.blogPosts)

    );
  }

  getblogPostCategories(): Observable<BlogPostCategory[]> {
    return this.httpClient.get<GetResponseBlogPostCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.blogPostCategory)

    );
  }


  searchBlogPosts(theKeyword: string):Observable<BlogPost[]> {
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`;
    return this.httpClient.get<GetResponseBlogPost>(searchUrl).pipe(
      map(response => response._embedded.blogPosts));
  }
}

interface GetResponseBlogPost {
  _embedded:{
    blogPosts:BlogPost[];
  }
}

interface GetResponseBlogPostCategory {
  _embedded:{
    blogPostCategory:BlogPostCategory[];
  }
}
