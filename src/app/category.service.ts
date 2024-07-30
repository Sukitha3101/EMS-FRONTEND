import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Category {
  categoryID: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:6060'; 

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: Category): Observable<Category> {
    console.log(category);
    return this.http.post<Category>(`${this.apiUrl}/categories`, category);

  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/${category.categoryID}`, category);
  }

  deleteCategory(categoryID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${categoryID}`);
  }
}
