import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogPostService} from "../../services/blog-post.service";
import {BlogPost} from "../../common/blog-post";
import {ignoreElements} from "rxjs";

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.css']
})
export class BlogPostDetailsComponent implements OnInit {

  blogPost: BlogPost = new BlogPost();

  constructor(private blogPostService:BlogPostService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleBlogPostDetails();
    })
  }

  private handleBlogPostDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    // @ts-ignore
    const theBlogPostId: number = +this.route.snapshot.paramMap.get('id');

    this.blogPostService.getBlogPost(theBlogPostId).subscribe(
      data => this.blogPost = data
    )
  }
}
