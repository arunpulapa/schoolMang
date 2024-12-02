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
  sidebarOpen: boolean = true; // Initial state of the sidebar
  searchTerm: string = ''; // Search term for filtering menu items
  isSubmenuOpen: { [key: string]: boolean } = {}; // Tracks if submenus are open or closed

  menuItems = [
    { icon: 'bi bi-speedometer2', label: 'Dashboard', link: '/table' },
    {
      label: 'Teachers',
      icon: 'bi bi-funnel',
      hasSubmenu: true,
      submenu: [
        { label: 'All Teachers', link: '/teachers/all', icon: 'bi bi-person' },
        { label: 'Deleted', link: '/teachers/deleted', icon: 'bi bi-trash' },
      ],
    },
    {
      label: 'Students',
      icon: 'bi bi-people',
      hasSubmenu: true,
      submenu: [
        { label: 'All Students', link: '/students/all', icon: 'bi bi-person' },
        { label: 'Deleted', link: '/students/deleted', icon: 'bi bi-trash' },
      ],
    },
    { icon: 'bi bi-mortarboard', label: 'Parents', link: '/parents' },
    { icon: 'bi bi-check2-square', label: 'Attendance', link: '/attendance' },
  ];

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      const startYear = this.currentYear + i;
      const endYear = startYear + 1;
      this.sessionYears.push(`${startYear} - ${endYear}`);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen; // Toggle the sidebar state
  }

  toggleSubmenu(label: string): void {
    this.isSubmenuOpen[label] = !this.isSubmenuOpen[label];
  }

  filteredMenuItems() {
    if (!this.searchTerm) return this.menuItems;
    return this.menuItems.filter(
      (item) =>
        item.label.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (item.submenu &&
          item.submenu.some((subItem) =>
            subItem.label.toLowerCase().includes(this.searchTerm.toLowerCase())
          ))
    );
  }
}