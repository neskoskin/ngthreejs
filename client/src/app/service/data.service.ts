import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
  private url: string = 'http://localhost:5000/api/login';
  constructor(private http: Http) { }
  login(credentials): Observable<any> {
    const getLoginUrl = this.url;
    return this.http
      .post(getLoginUrl, credentials)
      .map(
        res => {
          if (res.status == 200) {
            localStorage.setItem('currentUser', JSON.stringify(res['_body']));
          }
          return res;
        },
        err => {
          return err;
        }
      )
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}