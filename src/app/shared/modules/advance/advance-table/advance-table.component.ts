import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HeadingService } from 'src/app/shared/services/heading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Iadvance } from 'src/app/shared/models/advancePay';
import { AdvancePayService } from 'src/app/shared/services/advance-pay.service';
import { AdvanceFormComponent } from '../advance-form/advance-form.component';
import { DeleteConfirmationComponent } from '../../material/delete-confirmation/delete-confirmation.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-advance-table',
  templateUrl: './advance-table.component.html',
  styleUrls: ['./advance-table.component.scss']
})
export class AdvanceTableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'contact',
    'date',
    'reason',
    "amount",
    'action1',
    'action2'
  ];
  dataSource!: MatTableDataSource<Iadvance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empNameArray!: Array<string>
  constructor(
    private _headingService: HeadingService,
    private _dialog: MatDialog,
    private _advancePayService: AdvancePayService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this._headingService.heading$.next('Advance')
    this.getALlAdvance()
  }

  getALlAdvance() {
    return this._advancePayService.getAllAdvance()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      })
  }
  openAdvanceForm() {
    let dialogConfig = new MatDialogConfig
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this._dialog.open(AdvanceFormComponent, dialogConfig).afterClosed()
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.getALlAdvance()
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
  onDeleteAdvance(obj: Iadvance) {
    this._dialog.open(DeleteConfirmationComponent).afterClosed()
      .subscribe(res => {
        if (res) {
          this._advancePayService.deleteAdvance(obj.id!)
            .subscribe(res => {
              this.getALlAdvance()
              this._snackbarService.snackBarOpen(`${obj.empName} Advance Pay is Deleted...!!!`)
            })
        }
      })
  }

  onEditAdvance(obj: Iadvance) {
    let dialogConfig = new MatDialogConfig
    dialogConfig.data = obj
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = true
    this._dialog.open(AdvanceFormComponent, dialogConfig).afterClosed()
      .subscribe(res => {
        if (res) {
          this.getALlAdvance()
        }
      })
  }
}
