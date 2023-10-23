import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { EmployeTableComponent } from './shared/modules/employees/employe-table/employe-table.component';
import { AttendanceModule } from './shared/modules/attendance/attendance.module';
import { AttendanceTableComponent } from './shared/modules/attendance/attendace-table/attendance-table/attendance-table.component';
import { LeaveTableComponent } from './shared/modules/leaves/leave-table/leave-table.component';
import { AdvanceTableComponent } from './shared/modules/advance/advance-table/advance-table.component';
import { SaleryRecordTableComponent } from './shared/modules/salery-record/salery-record/salery-record-table/salery-record-table.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'employees',
    component: EmployeTableComponent,
  },
  {
    path: 'attendance',
    component: AttendanceTableComponent
  },
  {
    path: 'leaves',
    component: LeaveTableComponent
  },
  {
    path: 'advance',
    component: AdvanceTableComponent
  },
  {
    path : 'saleryrecord',
    component: SaleryRecordTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
