import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoPlayerService } from '@app/video-player/video-player.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Video } from '@app/video-player/video.model';
import { DataApiService } from '@app/shared/data-api/data-api.service';

@Component({
  selector: 'app-play-history',
  templateUrl: './play-history.component.html',
  styleUrls: ['./play-history.component.scss']
})
export class PlayHistoryComponent implements OnInit, OnDestroy {
  private videoPlayerSubscription: Subscription;
  historyList: Video[] = [];
  constructor(private videoPlayerService: VideoPlayerService, private apiService: DataApiService) {
    this.videoPlayerSubscription = videoPlayerService.currentVideo().subscribe((video: Video) => {
      this.add(video);
    });
  }

  ngOnInit() {
    this.apiService.getPlayHistory().subscribe((videos: Video[]) => {
      this.historyList = videos;
    });
  }

  add(video: Video) {
    if (this.historyList.find(e => e.videoId === video.videoId)) {
      return;
    }
    this.apiService.addPlayHistory(video).subscribe((result: Video) => {
      this.historyList.unshift(result);
    });
  }

  delete(video: Video) {
    const index = this.historyList.indexOf(video);
    if (index > -1) {
      this.historyList.splice(index, 1);
    }
    this.apiService.deletePlayHistory(video).subscribe();
  }

  playVideo(video: Video) {
    this.videoPlayerService.playVideo(video);
  }

  ngOnDestroy() {
    this.videoPlayerSubscription.unsubscribe();
  }

}
