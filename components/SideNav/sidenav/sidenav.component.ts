import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { link } from 'fs';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  currentYear: number = new Date().getFullYear();
  sessionYears: string[] = [];
  selectedSession: string = `${this.currentYear} - ${this.currentYear + 1}`;

  menuItems = [
    { icon: 'bi bi-speedometer2', label: 'Dashboard', link: '/table' },
    { icon: 'bi bi-speedometer2', label: 'Dashboard', link: '' },
    {
      label: 'Teachers',
      icon: 'bi bi-funnel',
      hasSubmenu: true,
      link:'/table',
      submenu: [
        {
          label: 'All Teachers',
          link: 'https://account.vedmarg.com/user/teachers',
          icon: 'bi bi-funnel',
        },
        {
          label: 'Deleted',
          link: '/table',
          icon: 'bi bi-funnel',
        },
      ],
    },
    {
      label: 'Students',
      icon: 'bi bi-funnel',
      hasSubmenu: true,
      link:'/table',
      submenu: [
        {
          label: 'All Teachers',
          link: 'https://account.vedmarg.com/user/teachers',
          icon: 'bi bi-funnel',
        },
        {
          label: 'Deleted',
          link: '/table',
          icon: 'bi bi-funnel',
        },
      ],
    },
    { icon: 'bi bi-mortarboard', label: 'parents', link: '/grid' },
    { icon: 'bi bi-mortarboard', label: 'Attendence', link: '/grid' },
    // Add more items here as needed
  ];

  ngOnInit(): void {
    // Generate session years in the "YYYY - YYYY" format
    for (let i = 0; i < 2; i++) {
      const startYear = this.currentYear + i;
      const endYear = startYear + 1;
      this.sessionYears.push(`${startYear} - ${endYear}`);
    }
  }

  isSubmenuOpen: { [key: string]: boolean } = {};
  searchTerm: string = '';  // Variable to store the search term

  // Toggle the submenu open/close state
  toggleSubmenu(label: string): void {
    this.isSubmenuOpen[label] = !this.isSubmenuOpen[label];
  }

  // Filter the menu items based on the search term
  filteredMenuItems() {
    if (!this.searchTerm) {
      return this.menuItems; // If there's no search term, return all items
    }

    return this.menuItems.filter(item =>
      item.label.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (item.submenu && item.submenu.some(subItem => subItem.label.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
  }
}
