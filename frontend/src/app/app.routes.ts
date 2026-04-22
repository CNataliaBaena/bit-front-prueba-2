import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { DepartmentsComponent } from './components/pages/departments/departments';
import { EmployeesComponent } from './components/pages/employees/employees';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  { path: 'departments', component: DepartmentsComponent, title: 'Departamentos' },
  { path: 'employees', component: EmployeesComponent, title:'Empleados' }
];
