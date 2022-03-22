import { Component, OnInit } from '@angular/core';
import {BlogPostCategory} from "../../common/blog-post-category";
import {BlogPostService} from "../../services/blog-post.service";

@Component({
  selector: 'app-blog-post-category-menu',
  templateUrl: './blog-post-category-menu.component.html',
  styleUrls: ['./blog-post-category-menu.component.css']
})
export class BlogPostCategoryMenuComponent implements OnInit {

  blogPostCategories: BlogPostCategory[]= [];

  constructor(private blogPostService:BlogPostService) { }

  ngOnInit(): void {
    this.listBlogPostCategories();
  }

  listBlogPostCategories() {
    this.blogPostService.getblogPostCategories().subscribe(
      data => {
        console.log("Product Categories="+ JSON.stringify(data));
        this.blogPostCategories = data;
      }
    )
  }
}
