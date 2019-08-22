import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { VideoPlayerService } from './video-player.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Video } from './video.model';
import { NgxY2PlayerOptions, NgxY2PlayerComponent } from 'ngx-y2-player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnDestroy {
  private videoPlayerSubscription: Subscription;
  @ViewChild('videoPlayer', { static: false }) videoPlayer: NgxY2PlayerComponent;
  currentVideoId: string;
  playerReady = false;

  playerOptions: NgxY2PlayerOptions = {
    height: 'auto'
  };
  constructor(private videoPlayerService: VideoPlayerService) {
    this.videoPlayerSubscription = videoPlayerService.currentVideo().subscribe((video: Video) => {
      this.playVideo(video.videoId);
    });
  }

  playVideo(videoId: string) {
    this.currentVideoId = videoId;
    this.videoPlayer.videoPlayer.loadVideoById(videoId);
  }

  /** if player is wasn't ready when play was clicked, play video after player is ready */
  onReady() {
    this.playerReady = true;

    if (this.currentVideoId) {
      this.playVideo(this.currentVideoId);
    }
  }

  ngOnDestroy() {
    this.videoPlayerSubscription.unsubscribe();
  }


}
