import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostCategoryMenuComponent } from './blog-post-category-menu.component';

describe('BlogPostCategoryMenuComponent', () => {
  let component: BlogPostCategoryMenuComponent;
  let fixture: ComponentFixture<BlogPostCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostCategoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
