import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {
  slug = '';
  imgSrc = './assets/placeholder-image.png';

  constructor() {}

  generateSlug($event: any) {
    this.slug = $event.target.value.toLowerCase().trim().replace(/\s+/g, '-');
  }
}
