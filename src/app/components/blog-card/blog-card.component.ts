import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/models/post';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {
    this.pageSizeOptions = [5, 10, 20];
    const pageSize = localStorage.getItem('pageSize');
    this.config = {
    currentPage: 1,
    itemsPerPage: pageSize ? +pageSize : this.pageSizeOptions[0]
    };}
  blogPost: Post[] = [];
  private unsubscribe$ = new Subject<void>();
  config: any;
  pageSizeOptions = [];



  ngOnInit() {
    this.getBlogPosts();
    this.route.params.subscribe(
      params => {
      this.config.currentPage = +params['pagenum'];
      this.getBlogPosts();
      }
      );
  }
  getBlogPosts() {
    this.blogService
      .getAllPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.blogPost = result;
      });
  }

  delete(postId: string) {
    if (confirm('Are you sure')) {
    this.blogService.deletePost(postId).then(
    () => {
    this.snackBarService.showSnackBar('Blog post deleted successfully');
    }
    );
  }

}
ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
  }

}
