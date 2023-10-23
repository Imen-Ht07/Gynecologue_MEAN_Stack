// article.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:4000/articles';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }
  getNbAr(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getArticle`)
  }

  createArticle(article: Article, photo: File): Observable<Article> {
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('description', article.description);
    formData.append('content', article.content);
    formData.append('photo', photo, photo.name);
    return this.http.post<Article>(this.apiUrl, formData);
  }

  getArticle(id: string): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Article>(url);
  }

  updateArticle(id: string, article: Article, photo: File): Observable<Article> {
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('description', article.description);
    formData.append('content', article.content);
    formData.append('photo', photo, photo.name);
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Article>(url, formData);
  }

  deleteArticle(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
