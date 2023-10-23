import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../../model/article';
import { ArticleService } from '../../service/article.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  photo: File | undefined = undefined;
  articles!: Article[];
  articleForm!: FormGroup;
  selectedArticle: Article | undefined = undefined;
  isEditMode: boolean = false;

  constructor(private articleService: ArticleService,private UserService:UserService ,
    ) { }

  ngOnDestroy(): void {
    // left empty
  }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      photo: new FormControl('')
    });
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe(
      (res: Article[]) => {
        this.articles = res;
      },
      (err) => console.error(err)
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.photo = input.files[0];
    }
  }

  onSubmit() {
    const article = this.articleForm.value;
    if (this.isEditMode && this.selectedArticle && this.selectedArticle._id && this.photo) {
      this.articleService.updateArticle(this.selectedArticle._id, article, this.photo).subscribe(
        (res: Article) => {
          const index = this.articles.findIndex(a => a._id === res._id);
          this.articles[index] = res;
          this.articleForm.reset();
          this.photo = undefined;
          this.selectedArticle = undefined;
          this.isEditMode = false;
        },
        (err) => console.error(err)
      );
    } else {
      if (this.photo) {
        this.articleService.createArticle(article, this.photo).subscribe(
          (res: Article) => {
            this.articles.unshift(res);
            this.articleForm.reset();
            this.photo = undefined;
          },
          (err) => console.error(err)
        );
      }
    }
  }
  

  onEdit(article: Article) {
    this.articleForm.patchValue({
      title: article.title,
      description: article.description,
      content: article.content
    });
    this.selectedArticle = article;
    this.isEditMode = true;
  }
  
  onCancel() {
    this.articleForm.reset();
    this.photo = undefined;
    this.selectedArticle = undefined;
    this.isEditMode = false;
  }


  onDelete(article: Article) {
    if (article && article._id && confirm(`Are you sure you want to delete the article "${article.title}"?`)) {
      this.articleService.deleteArticle(article._id).subscribe(
        () => {
          const index = this.articles.findIndex(a => a._id === article._id);
          this.articles.splice(index, 1);
        },
        (err) => console.error(err)
      );
    }
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.UserService.logoutUser()
    }
  }
  
}
