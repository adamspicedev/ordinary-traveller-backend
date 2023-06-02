import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';

interface FirestoreCategory {
  id: string;
  data: {
    category: string;
  };
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  currentCategories: FirestoreCategory[] = [];

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

    this.categoriesService.saveData(categoryData);

    formData.reset();
  }
}
