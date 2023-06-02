import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';

export interface FirestoreCategory {
  id: string;
  data: {
    category: string;
  };
}

const initialCategory: FirestoreCategory = {
  id: '',
  data: {
    category: '',
  },
};

enum FormStatus {
  Add = 'Add',
  Edit = 'Edit',
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  formStatus: string = FormStatus.Add;
  currentCategories: FirestoreCategory[] = [];
  selectedCategory: FirestoreCategory = initialCategory;

  constructor(private readonly categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.loadData().subscribe((data) => {
      console.log(data);

      this.currentCategories = data;
    });
  }

  onSubmit(formData: NgForm) {
    let categoryData: Category = {
      category: formData.value,
    };

    if (this.formStatus === FormStatus.Edit && this.selectedCategory) {
      this.categoriesService.updateData(this.selectedCategory);
      this.formStatus = FormStatus.Add;
      this.selectedCategory = initialCategory;
    } else {
      this.categoriesService.saveData(categoryData);
    }
    formData.reset();
  }

  onEdit(category: FirestoreCategory) {
    this.formStatus = FormStatus.Edit;
    this.selectedCategory = category;
  }

  onDelete(id: string) {
    this.categoriesService.deleteData(id);
  }
}
