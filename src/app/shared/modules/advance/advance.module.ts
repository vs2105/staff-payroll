import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AdvanceTableComponent } from './advance-table/advance-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvanceFormComponent } from './advance-form/advance-form.component';



@NgModule({
  declarations: [
    AdvanceTableComponent,
    AdvanceFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdvanceModule { }
