import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Video } from './video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private currentVideo$ = new Subject<Video>();

  playVideo(video: Video) {
    this.currentVideo$.next(video);
  }

  currentVideo(): Observable<Video> {
    return this.currentVideo$.asObservable();
  }

  constructor() { }
}
