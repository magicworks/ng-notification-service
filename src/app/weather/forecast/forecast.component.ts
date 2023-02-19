import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  // forecastData: {
  //   dateString: string,
  //   temp: number;
  // }[] = [];

  forecast$: Observable<{
    dateString: string,
    temp: number;
  }[]>;

  constructor(forecastService: ForecastService) {
    this.forecast$ = forecastService.getForecast();

    //forecastService.getForecast();
    // .subscribe((forecastData) => {
    //   this.forecastData = forecastData;
    // });
  }
}
