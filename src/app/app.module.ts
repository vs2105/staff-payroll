import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { EmployeesModule } from './shared/modules/employees/employees.module';
import { AdvanceModule } from './shared/modules/advance/advance.module';
import { AttendanceModule } from './shared/modules/attendance/attendance.module';
import { LeavesModule } from './shared/modules/leaves/leaves.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorService } from './shared/services/authinterceptor.service';
import { SaleryRecordTableComponent } from './shared/modules/salery-record/salery-record/salery-record-table/salery-record-table.component';
import { SaleryRecordModule } from './shared/modules/salery-record/salery-record/salery-record.module';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    SaleryRecordTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    EmployeesModule,
    AdvanceModule,
    AttendanceModule,
    LeavesModule,
    // SaleryRecordModule
  ],
  providers: [
   {
     provide:HTTP_INTERCEPTORS,
    useClass:AuthinterceptorService,
    multi:true
}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
