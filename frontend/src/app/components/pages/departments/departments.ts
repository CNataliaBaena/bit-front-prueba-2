import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../services/departments';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employees';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})

export class DepartmentsComponent implements OnInit {

  departments: any[] = [];
  employees: any[] = [];
  selectedDepartment: any = null;
  loadingEmployees = false;

  constructor(
    private deptService: DepartmentService,
    private empService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  loadEmployees(dept: any) {
    this.selectedDepartment = dept;
    this.loadingEmployees = true;
    this.employees = [];

    const code = Number(dept.departmentCode);

    this.empService.getByDepartment(code).subscribe({
      next: (resp) => {
        // this.employees = resp?.data || [];
        this.loadingEmployees = false;
        this.employees = [...resp.data];
        this.cdr.detectChanges(); // 🔥 fuerza render inmediato
      },
      error: (err) => {
        console.error(err);
        this.loadingEmployees = false;
      }
    });
  }

  newDept = {
    name: '',
    departmentCode: 0
  };

  editing: boolean = false;
  editingId: number | null = null;

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
  this.deptService.getAll().subscribe((data: any) => {
    this.departments = Array.isArray(data) ? data : data.data || [];
  });
}

  save() {
    if (this.editing && this.editingId !== null) {
      const { name} = this.newDept;
      this.deptService.update(this.editingId, { name }).subscribe({
        next: (resp) => {
          this.resetForm();
          this.loadDepartments();
          this.cdr.detectChanges();// 🔄 refresca desde backend
        },
        error: (err) => console.error('Error actualizando', err)
      });
    } else {
      console.log('Creando departamento:', this.newDept);
      this.deptService.create(this.newDept).subscribe(() => {
          this.resetForm();
          this.loadDepartments();
          this.cdr.detectChanges();
      });
    }
  }

  edit(dept: any) {
    this.newDept = { ...dept };
    this.editing = true;
    this.editingId = dept.departmentCode;
  }

  delete(id: number) {
    this.deptService.delete(id).subscribe({
      next: () => {
        this.departments = this.departments.filter(d => d.departmentCode !== id);
        this.loadDepartments();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error eliminando', err)
    });
  }

  resetForm() {
    this.newDept = { name: '', departmentCode: 0 };
    this.editing = false;
    this.editingId = null;
  }
}
