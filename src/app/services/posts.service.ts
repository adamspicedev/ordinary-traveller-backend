import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private firestore: AngularFirestore,
    private toastService: ToastService
  ) {}
}
