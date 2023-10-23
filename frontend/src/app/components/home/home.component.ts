import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../../model/article';
import { ArticleService } from '../../service/article.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  photo: File | undefined = undefined;
  articles!: Article[];
  articleForm!: FormGroup;
  selectedArticle: Article | undefined = undefined;
  isEditMode: boolean = false;
  currentYear: number;

  constructor(private articleService: ArticleService) { 
    this.currentYear = new Date().getFullYear();
  }
  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', Validators.required),
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

  
  




}
