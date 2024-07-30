import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';
import { HomeComponent } from '../home/home.component';

interface Category {
  categoryID: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  editingCategory: Category | null = null;
  editingCategoryName: string = '';
  editingCategoryDescription: string = '';
  categories: Category[] = [];

  user: any;

  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    private userService: UserService, private notificationService: NotificationService, private homeComponent: HomeComponent) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }


  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

  }

  onSubmit() {
    if (this.editingCategory) {
      return;
    }

    const newCategory: Category = {
      categoryID: 0,
      ...this.categoryForm.value
    };

    const newNotification: any = {
      user: this.user.uid,
      status: 'UNREAD',
      date: new Date().toISOString(),
      message: `New category (${newCategory.name}) created`,
    };

    this.categoryService.createCategory(newCategory).subscribe(category => {
      this.categories.push(category);
      this.categoryForm.reset();
    });
    this.notificationService.createNotification(newNotification).subscribe(notification => {
      this.homeComponent.loadNotifications();
    });
  }


  editCategory(category: Category): void {
    this.editingCategory = { ...category };
    this.editingCategoryName = category.name;
    this.editingCategoryDescription = category.description;
  }

  updateCategory(): void {
    if (this.editingCategory) {
      this.editingCategory.name = this.editingCategoryName;
      this.editingCategory.description = this.editingCategoryDescription;

      this.categoryService.updateCategory(this.editingCategory).subscribe(updatedCategory => {
        const index = this.categories.findIndex(c => c.categoryID === updatedCategory.categoryID);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.editingCategory = null;
    this.editingCategoryName = '';
    this.editingCategoryDescription = '';
  }

  deleteCategory(categoryID: number): void {
    this.categoryService.deleteCategory(categoryID).subscribe(() => {
      this.categories = this.categories.filter(c => c.categoryID !== categoryID);
    });
  }

  isEditing(): boolean {
    return this.editingCategory !== null;
  }

  isAdmin(): boolean {
    if (this.user.role == 'ADMIN'){
      return true;
    }else{
      return false;
    }
  }
}
