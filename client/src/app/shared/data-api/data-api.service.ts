import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Video } from '@app/video-player/video.model';
import { UserService } from '@app/shared/user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  API_URL = environment.API_URL;
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  infos: object;
  userSubscription: Subscription;
  id: number;

  getPlayHistory(): Observable<Video[]> {
    if (!this.userService.isLoggedIn()) {
      throw new Error('getPlayHistory failed: user is not logged in');
    }
    return this.httpClient.get<Video[]>(`${this.API_URL}/play-histories/?userId=${this.userService.getUserId()}`);
  }

  addPlayHistory(video: Video): Observable<Video> {
    if (!this.userService.isLoggedIn()) {
      throw new Error('addPlayHistory failed: user is not logged in');
    }
    return this.httpClient.post<Video>(`${this.API_URL}/play-histories`, video);
  }

  deletePlayHistory(video: Video): Observable<any> {
    if (!this.userService.isLoggedIn()) {
      throw new Error('deletePlayHistory failed: user is not logged in');
    }
    return this.httpClient.delete(`${this.API_URL}/play-histories/${video._id}`);
  }

}
