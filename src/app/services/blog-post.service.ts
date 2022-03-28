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

  getBlogPost(theBlogPostId: number): Observable<BlogPost> {

    // need to build URL based on Blog Post id
    const blogPostUrl = `${this.baseUrl}/${theBlogPostId}`;
    return this.httpClient.get<BlogPost>(blogPostUrl);
  }

  getblogPostList(theCategoryId: number): Observable<BlogPost[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseBlogPosts>(searchUrl).pipe(
      map(response => response._embedded.blogPosts)

    );
  }

  getblogPostListPaginate(thePage: number,
                          thePageSize: number,
                          theCategoryId: number): Observable<GetResponseBlogPosts> {

    // need to build URL based on category id, page and size
    const url = `${this.baseUrl}/search/findByCategoryId`
                +`?id=${theCategoryId}&page=${thePage}&size=${thePageSize}` ;

    return this.httpClient.get<GetResponseBlogPosts>(url);
  }

  getblogPostCategories(): Observable<BlogPostCategory[]> {
    return this.httpClient.get<GetResponseBlogPostCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.blogPostCategory)

    );
  }


  searchBlogPosts(theKeyword: string):Observable<BlogPost[]> {
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`;
    return this.httpClient.get<GetResponseBlogPosts>(searchUrl).pipe(
      map(response => response._embedded.blogPosts));
  }

  searchBlogPostsPaginate(thePage: number,
                          thePageSize: number,
                          theKeyword: string): Observable<GetResponseBlogPosts> {

    // need to build URL based on keyword , page and size
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`
                    +`&page=${thePage}&size=${thePageSize}` ;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseBlogPosts>(searchUrl);
  }




}

interface GetResponseBlogPosts {
  _embedded:{
    blogPosts:BlogPost[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}

interface GetResponseBlogPostCategory {
  _embedded:{
    blogPostCategory:BlogPostCategory[];
  }
}
