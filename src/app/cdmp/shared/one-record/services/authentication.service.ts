import { Injectable } from '@angular/core';

import { OcpHttpService } from '@ocp/ng-core';
import { OneRecordAuthentication } from '../model/authentication.model';
import { PageResource } from '@ocp/ng-open-cargo-web';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { options } from 'app/app-routing.module';

@Injectable()
export class OneRecordAuthenticationService {

    private token: OneRecordAuthentication;

    private TOKEN_URL: string = 'https://auth.one-record.lhind.dev/b8a746a6-c540-43f4-92f3-6150ad057215/b2c_1a_hackathon/oauth2/v2.0/token';

    constructor(private http: HttpClient) {
    }

    public obtainAccessToken(): Observable<OneRecordAuthentication> {

        let body = new URLSearchParams();
        body.set('grant_type', 'client_credentials');
        body.set('scope', 'https://auth.one-record.lhind.dev/c2ab0f3d-574e-4d07-a7bd-c35d4dc5821f/.default');
        body.set('client_id', 'c2ab0f3d-574e-4d07-a7bd-c35d4dc5821f');
        body.set('client_secret', 'Zdo8Q~DfQArDzCsS6Ud0XR.ab15LKiqFU0ssYc32');

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        console.log('JAYS call OneRecord!');
        return this.http.post<OneRecordAuthentication>(this.TOKEN_URL, body.toString(), options).pipe(
            tap((response: any) => this.debugResponse(response))
          );
    }

    private debugResponse(response: any) {
        console.log('JAYS token response:' + response);
    }

    private log(message: string) {
        console.log(`AuthenticationService: ${message}`);
    }
}
