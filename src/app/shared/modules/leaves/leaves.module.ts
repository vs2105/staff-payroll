import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveTableComponent } from './leave-table/leave-table.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { MaterialModule } from '../material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LeaveTableComponent,
    LeaveFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class LeavesModule { }
