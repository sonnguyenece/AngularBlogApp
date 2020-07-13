import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    userId: new FormControl(''),
    title: new FormControl(''),
    body: new FormControl(''),
  });
  private postId: number;
   message: string;

  constructor(
private postService: PostService,
private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
this.activeRoute.params.subscribe(params=>{
  this.postId= params.id;
  this.postService.getPostById(this.postId).subscribe(result=>{
    this.postForm.setValue(result);
  });
});
  }
  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.postService.updatePost(value)
        .subscribe(next => {
          this.postForm.reset({
            title: '',
            body: ''
          });
        }, error => console.log(error));
    }
  }
}
