import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../services/departments';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})

export class DepartmentsComponent implements OnInit {

  departments: any[] = [];

  newDept = {
    codeDepartment: 0,
    nameDepartment: ''
  };

  editing: boolean = false;
  editingId: number | null = null;

  constructor(private deptService: DepartmentService) {}

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
      this.deptService.update(this.editingId, this.newDept).subscribe({
        next: () => {
          this.resetForm();
          this.loadDepartments(); // 🔄 refresca desde backend
        },
        error: (err) => console.error('Error actualizando', err)
      });
    } else {
      this.deptService.create(this.newDept).subscribe({
        next: () => {
          this.resetForm();
          this.loadDepartments();
        },
        error: (err) => console.error('Error creando', err)
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
      next: () => this.loadDepartments(),
      error: (err) => console.error('Error eliminando', err)
    });
  }

  resetForm() {
    this.newDept = { codeDepartment: 0, nameDepartment: '' };
    this.editing = false;
    this.editingId = null;
  }
}
