import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByDepartment(departmentCode: number) {
    return this.http.get<any>(
      `${this.apiUrl}/departments/${departmentCode}`
    );
  }

  create(emp: any) {
    return this.http.post(this.apiUrl, emp);
  }

  update(id: number, emp: any) {
    return this.http.put(`${this.apiUrl}/${id}`, emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
