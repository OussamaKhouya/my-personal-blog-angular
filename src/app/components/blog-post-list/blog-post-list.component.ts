import { Component, OnInit } from '@angular/core';
import {BlogPost} from "../../common/blog-post";
import {BlogPostService} from "../../services/blog-post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list-grid.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent implements OnInit {

  blogPosts: BlogPost[]=[];
  currentCategoryId: number = 1;

  constructor(private blogPostService: BlogPostService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listBlogPost();
    })

  }

  private listBlogPost() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the id param string. convert string to a number using the "+" symbol
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // no category id available ... default to category id 1
      this.currentCategoryId = 1;
    }
    // now get the blog posts for the given category id
    this.blogPostService.getblogPostList(this.currentCategoryId).subscribe(
      data => {
        this.blogPosts = data;
      }
    )
  }
}
