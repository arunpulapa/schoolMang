import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface Skill {
  area: string;
  skill: string;
  rank: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule, MatCardModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  skills: Skill[] = [
    { area: 'Development', skill: 'HRIS', rank: 34 },
    { area: 'HRIS', skill: 'PHP', rank: 40 },
    { area: 'QA', skill: 'WordPress', rank: 50 },
    { area: 'Testing', skill: 'Java', rank: 25 },
    { area: 'Office', skill: 'CodeIgniter', rank: 35 },
    { area: 'Development', skill: 'Angular', rank: 42 },
    { area: 'Testing', skill: 'React', rank: 38 },
  ];
  constructor(private modalService: NgbModal) {}

  get filteredSkills() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.skills.filter(
      (skill) =>
        skill.area.toLowerCase().includes(searchTermLower) ||
        skill.skill.toLowerCase().includes(searchTermLower)
    );
  }

  get paginatedSkills() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredSkills.slice(startIndex, endIndex);
  }

  get totalPages() {
    const total = Math.ceil(this.filteredSkills.length / this.itemsPerPage);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  get maxPage() {
    return Math.ceil(this.filteredSkills.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.maxPage) {
      this.currentPage = page;
    }
  }

  editSkill(skill: Skill) {
    console.log('Editing skill:', skill);
    alert(`Editing Skill: ${skill.skill}`);
  }
}