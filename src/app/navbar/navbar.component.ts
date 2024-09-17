import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isDropdownVisible: boolean = false;
  searchTerm: string = '';
  as: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  searchMovies() {
    if (this.searchTerm) {
      this.router.navigate(['/movies'], { queryParams: { query: this.searchTerm } });
    }
  }

  changeLanguage(event: Event) {
    const select = event.target as HTMLSelectElement;
    const language = select.value;
    this.translate.use(language);
  }
  navigateTo(route: string) {
    // Navigate to the route based on the parameter
    this.router.navigate([`/${route}`]);
  }


  onLangChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.translate.use(language);
  }


  protected readonly HTMLSelectElement = HTMLSelectElement;
}
