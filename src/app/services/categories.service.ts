import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastService } from './toast.service';
import { map } from 'rxjs/operators';

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
      .then((docRef) => {
        this.toastService.showSuccess(
          'Done',
          'Your category has been saved successfully!'
        );
      })
      .catch((error) => console.log(error));
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
}
