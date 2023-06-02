import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastService } from './toast.service';
import { map } from 'rxjs/operators';
import { FirestoreCategory } from '../categories/categories.component';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private firestore: AngularFirestore,
    private toastService: ToastService
  ) {}

  saveData(formData: Category) {
    this.firestore
      .collection('categories')
      .add(formData.category)
      .then(() => {
        this.toastService.showSuccess(
          'Done',
          'Your category has been saved successfully!'
        );
      })
      .catch((error) => this.toastService.showError('Error', error));
  }

  loadData() {
    return this.firestore
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Category;
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  updateData(category: FirestoreCategory) {
    console.log('category', category);
    this.firestore
      .doc(`categories/${category.id}`)
      .update(category.data)
      .then(() => {
        this.toastService.showSuccess(
          'Done',
          'Your category has been updated successfully!'
        );
      })
      .catch((error) => this.toastService.showError('Error', error));
  }

  deleteData(id: string) {
    this.firestore
      .doc(`categories/${id}`)
      .delete()
      .then(() => {
        this.toastService.showSuccess(
          'Done',
          'Your category has been deleted successfully!'
        );
      })
      .catch((error) => this.toastService.showError('Error', error));
  }
}
