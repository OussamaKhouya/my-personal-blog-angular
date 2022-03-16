import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map,Observable} from "rxjs";
import {BlogPost} from "../common/blog-post"

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private baseUrl = "http://localhost:8082/api/blogPosts?size=20"

  constructor(private httpClient: HttpClient) { }

  getblogPostList(): Observable<BlogPost[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.blogPosts)
    );
  }
}

interface GetResponse {
  _embedded:{
    blogPosts:BlogPost[];
  }
}
