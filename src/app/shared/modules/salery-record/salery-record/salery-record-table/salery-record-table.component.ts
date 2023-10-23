import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SaleryRecordFormComponent } from '../salery-record-form/salery-record-form.component';
import { SaleryRecordService } from 'src/app/shared/services/salery-record.service';
import { HeadingService } from 'src/app/shared/services/heading.service';
import { DeleteConfirmationComponent } from '../../../material/delete-confirmation/delete-confirmation.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Isalery } from 'src/app/shared/models/saleryrecord';

@Component({
  selector: 'app-salery-record-table',
  templateUrl: './salery-record-table.component.html',
  styleUrls: ['./salery-record-table.component.scss']
})
export class SaleryRecordTableComponent implements OnInit {
  
  displayedColumns: string[] = ['EmpName', 'presentDays', 'saleryAmount', 'saleryDate','totalAdvance','edit','delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private _dialog: MatDialog,
     private _saleryrecord:SaleryRecordService,
     private _headingservice:HeadingService,
     private _saleryservice:SaleryRecordService, private _snackbar:SnackbarService) { }

  ngOnInit(): void {
    this.getsalerydetails()
    
  }

  openEmpForm(){
    let dialogConfig = new MatDialogConfig
    dialogConfig.autoFocus = true
    dialogConfig.disableClose = true
   this._dialog.open(SaleryRecordFormComponent).afterClosed()
   .subscribe((res)=>{console.log(res);
    if(res){
      this.getsalerydetails()
    }
   })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getsalerydetails(){
     this._headingservice.heading$.next('Salery-Record')
    this._saleryrecord.getsalerydetails()
    .subscribe((res)=>{
      console.log(res);
       this.dataSource = new MatTableDataSource(res)
       this.dataSource.sort=this.sort
       this.dataSource.paginator=this.paginator
    })
  }


  oneditsaleryform(obj:any){
    let dialogconfig = new MatDialogConfig
    dialogconfig.data = obj
    this._dialog.open(SaleryRecordFormComponent,dialogconfig).afterClosed()
    .subscribe(res => {
      if(res){
        this.getsalerydetails()
      }
    })
  }

  ondeletesalerydetails(obj:Isalery){
    console.log(obj);
    
    this._dialog.open(DeleteConfirmationComponent).afterClosed()
    .subscribe((res)=>{
      console.log(res);
      
      if(res){
        this._saleryrecord.deletesalerydetails(obj.id)
        .subscribe((res)=>{
         // this.getsalerydetails()
          this.getsalerydetails()
           this._snackbar.snackBarOpen(`${obj.EmpName} Deleted sucessfully!!!`)
        })
      }
    })
    
 
  }
}
