import { Injectable } from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  className: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}
  toasts: ToastInfo[] = [];

  showSuccess(header: string, body: string) {
    this.toasts.push({
      header,
      body,
      className: 'bg-success text-light mt-2 mb-2',
    });
  }

  showError(header: string, body: string) {
    this.toasts.push({
      header,
      body,
      className: 'bg-danger text-light mt-2 mb-2',
    });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }
}
