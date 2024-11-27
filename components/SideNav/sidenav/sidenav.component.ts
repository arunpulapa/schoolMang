import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  menuItems = [
    { icon: 'bi bi-speedometer2', label: 'Dashboard', link: '/table' },
    {
      icon: 'bi bi-funnel',
      label: 'Leads',
      hasSubmenu: true,
      submenu: [
        { label: 'Submenu Item 1', link: '/' },
        { label: 'Submenu Item 2', link: '/' },
      ],
    },
    {
      icon: 'bi bi-person-video3',
      label: 'Teachers',
      hasSubmenu: true,
      submenu: [
        { label: 'Teacher 1', link: '/' },
        { label: 'Teacher 2', link: '/' },
      ],
    },
    { icon: 'bi bi-mortarboard', label: 'Students', link: '/students' },
  ];

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
