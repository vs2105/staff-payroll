import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeadingService } from '../../services/heading.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {

  isLoading: boolean = false

  heading!: string
  constructor(
    private _headingService: HeadingService,
    private _loaderService: LoaderService
  ) {
    this._loaderService.loadingStatus.subscribe((res) => {
      this.isLoading = res
    })
  }



  ngOnInit(): void {

    this._headingService.heading$
      .subscribe(res => {
        this.heading = res
      })
  }

  ngOnDestroy(): void {
    this._headingService.heading$.unsubscribe()

  }


}
