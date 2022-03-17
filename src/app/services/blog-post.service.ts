import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map,Observable} from "rxjs";
import {BlogPost} from "../common/blog-post"

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private baseUrl = "http://localhost:8082/api/blogPosts"

  constructor(private httpClient: HttpClient) { }

  getblogPostList(theCategoryId: number): Observable<BlogPost[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.blogPosts)

    );
  }
}

interface GetResponse {
  _embedded:{
    blogPosts:BlogPost[];
  }
}
