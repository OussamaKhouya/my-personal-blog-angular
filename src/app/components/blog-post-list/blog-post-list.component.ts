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

  blogPosts: BlogPost[] = [];
  featuredBlogPost: BlogPost = new BlogPost();
  showFeaturedBlogPost = true;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new Properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 10;
  previousKeyword: string = "";
  constructor(private blogPostService: BlogPostService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listBlogPost();

    })

  }

  getFeaturedBlogPost(){
     this.featuredBlogPost = {...this.blogPosts[0]};
  }

   listBlogPost() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.showFeaturedBlogPost = false;
      this.handleSearchBlogPosts();
    }else {
      this.handleListBlogPosts();

    }
  }

  private handleSearchBlogPosts() {
    // @ts-ignore
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword ;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)

    // now search for Blog Posts using keyword
    this.blogPostService.searchBlogPostsPaginate(this.thePageNumber - 1,
                                                  this.thePageSize,
                                                  theKeyword).subscribe(this.processResult());
  }

  private handleListBlogPosts() {

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

    // check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    //if we have a different category id than previous
    // then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the blog posts for the given category id
    this.blogPostService.getblogPostListPaginate(this.thePageNumber - 1,
                                                        this.thePageSize,
                                                        this.currentCategoryId)
                                                        .subscribe(this.processResult())
  }

   processResult() {
    return (data:any) => {
      this.blogPosts = data._embedded.blogPosts;
      this.getFeaturedBlogPost();
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size ;
      this.theTotalElements = data.page.totalElements ;
    };
  }

  updatePageSize(pageSize: string) {
    console.log(pageSize)
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listBlogPost();
  }
}

interface GetResponseBlogPosts {
  _embedded:{
    blogPosts:BlogPost[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
