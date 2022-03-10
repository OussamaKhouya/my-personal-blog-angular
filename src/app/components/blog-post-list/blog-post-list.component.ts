import { Component, OnInit } from '@angular/core';
import {BlogPost} from "../../common/blog-post";
import {BlogPostService} from "../../services/blog-post.service";

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent implements OnInit {

  blogPosts: BlogPost[]=[];

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.listBlogPost();
  }

  private listBlogPost() {
    this.blogPostService.getblogPostList().subscribe(
      data => {
        this.blogPosts = data;
      }
    )
  }
}
