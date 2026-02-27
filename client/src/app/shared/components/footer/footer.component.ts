import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="bg-dark text-white py-4 mt-auto">
      <div class="container text-center">
        <p class="mb-0">&copy; {{ year }} ShopSmart. All Rights Reserved.</p>
        <div class="mt-2">
          <a href="#" class="text-white me-3 text-decoration-none"><i class="fa fa-facebook fa-lg"></i></a>
          <a href="#" class="text-white me-3 text-decoration-none"><i class="fa fa-twitter fa-lg"></i></a>
          <a href="#" class="text-white text-decoration-none"><i class="fa fa-instagram fa-lg"></i></a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
    year = new Date().getFullYear();
}
