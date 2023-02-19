import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, switchMap, mergeMap, share, retry, Observable, of, filter, toArray, catchError, throwError } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';

interface CoordsResponse {
  latitude: number,
  longitude: number,
  altitude: number | null,
  accuracy: number,
  altitudeAccuracy: number | null,
  heading: number | null,
  speed: number | null;
}

interface OpenWeatherResponse {
  list: {
    dt_txt: string,
    main: {
      temp: number;
    };
  }[];
  city: {
    name: string;
    country: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url = 'http://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService) { }

  getForecast () {
    return this.getCurrentLocation()
      .pipe(
        //tap((value: CoordsResponse) => { console.log(value); }),
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', '91a698ba81014e5359d11779bd032d23');
        }),
        switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })),
        tap((value) => {
          this.notificationsService.addSuccess(`Weather data loaded for ${value.city.name}, ${value.city.country}`);
        }),
        map((value) => value?.list),
        mergeMap(value => of(...value)),
        filter((value, index) => index % 8 === 0),
        map(value => {
          return {
            dateString: value.dt_txt,
            temp: value.main.temp
          };
        }),
        toArray(),
        share()
      );
  }

  getCurrentLocation (): Observable<CoordsResponse> {
    const observable: Observable<CoordsResponse> = new Observable((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });

    return observable.pipe(
      retry(1),
      tap(() => {
        this.notificationsService.addSuccess('Got your location');
      }),
      catchError(() => {
        this.notificationsService.addError('Failed to get your location. ');
        this.notificationsService.addSuccess('Location will be set as Riga, Latvia.');

        const coords: CoordsResponse = {
          latitude: 56.9681852106608,
          longitude: 24.107117908474333,
          altitude: null,
          accuracy: 150,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        };

        return of(coords);
        // return throwError(err);
      })
    );
  }
}
