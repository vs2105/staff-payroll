import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { HeadingService } from 'src/app/shared/services/heading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ileave } from 'src/app/shared/models/leave';
import { LeaveService } from 'src/app/shared/services/leave.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DeleteConfirmationComponent } from '../../material/delete-confirmation/delete-confirmation.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.scss']
})
export class LeaveTableComponent implements OnInit, OnDestroy {
  leaveArray: Array<Ileave> = []
  displayedColumns: string[] = [
    'name',
    'contact',
    'date',
    "numOfDay",
    'reason',
    'action1',
    'action2'
  ];
  dataSource!: MatTableDataSource<Ileave>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _headingService: HeadingService,
    private _leaveService: LeaveService,
    private _utilityService: UtilityService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this._headingService.heading$.next('Leaves')
    this.getAllLeave()
  }

  getAllLeave() {
    return this._leaveService.getAllLeaves()
      .subscribe(res => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      })
  }
  openLeaveForm() {
    let dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false
    this._dialog.open(LeaveFormComponent, dialogConfig).afterClosed()
      .subscribe(res => {
        // console.log(res);
        if (res) {
          this.getAllLeave()
        }
      })
  }


  onEditLeave(obj: Ileave) {
    let dialogConfig = new MatDialogConfig
    dialogConfig.data = obj
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false

    this._dialog.open(LeaveFormComponent, dialogConfig).afterClosed().subscribe(res => {
      // console.log(res);
      if (res) {
        this.getAllLeave()
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

  onDeleteLeave(obj: Ileave) {
    this._dialog.open(DeleteConfirmationComponent).afterClosed()
      .subscribe(res => {
        if (res) {

          this._leaveService.removeLeave(obj.id!)
            .subscribe(res => {
              // console.log(res);
              this.getAllLeave()
              this._snackbarService.snackBarOpen(`${obj.empName}'s leave Deleted...!!!`)
            })

        }

      })
  }

  ngOnDestroy(): void {

  }
}
