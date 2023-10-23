import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleryRecordFormComponent } from './salery-record-form/salery-record-form.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SaleryRecordFormComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SaleryRecordModule { }
