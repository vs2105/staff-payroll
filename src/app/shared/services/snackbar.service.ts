import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _matSnack: MatSnackBar
  ) { }

  snackBarOpen(msg: string) {
    return this._matSnack.open(msg, 'Close', {
      horizontalPosition: "center",
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
