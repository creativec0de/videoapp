import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const AUTH_STORAGE_KEY = 'logged-user-auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.API_URL;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private httpClient: HttpClient, ) {

  }

  public anonymousSignIn(): Observable<boolean> {
    return this.httpClient.post<UserAuth>(`${this.API_URL}/users/anonymous-sign-in`, {}).pipe(
      map((loginResponse: UserAuth) => {
        if (loginResponse.authToken) {
          this.storage.set(AUTH_STORAGE_KEY, loginResponse);
          return true;
        } else {
          return false;
        }
      }));
  }

  public getUserId() {
    return (this.storage.get(AUTH_STORAGE_KEY) || {}).userId;
  }

  public isLoggedIn() {
    return this.storage.get(AUTH_STORAGE_KEY) ? true : false;
  }

  public getAuthToken() {
    return (this.storage.get(AUTH_STORAGE_KEY) || {}).authToken;
  }
}

export class UserAuth {
  authToken: string;
  userId: string;
}
