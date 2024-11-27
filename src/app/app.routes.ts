import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidenavComponent } from '../../components/SideNav/sidenav/sidenav.component';
import { GridComponent } from '../../components/grid/grid.component';
import { StudentsComponent } from '../../components/students/students.component';
import { TableComponent } from '../../components/table/table.component';

export const routes: Routes = [
    { path: '', component: SidenavComponent },
    { path: 'grid', component: GridComponent },
    { path: 'students', component: StudentsComponent },
    { path: 'table', component: TableComponent },
];
