import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoPlayerService } from '@app/video-player/video-player.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Video } from '@app/video-player/video.model';
import { environment } from 'src/environments/environment';

export interface State {
  flag: string;
  name: string;
  population: string;
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchVideosCtrl = new FormControl();
  videoSearchResults: Video[];
  isLoading = false;

  constructor(
    private http: HttpClient,
    private videoPlayerService: VideoPlayerService
  ) { }

  ngOnInit() {
    this.searchVideosCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.videoSearchResults = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            key: environment.YOUTUBE_API_KEY,
            type: 'video',
            q: value,
          }
        })
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe((data: any) => {

        if (data.items) {
          this.videoSearchResults = data.items.map((item: any): Video => {
            return {
              videoId: item.id.videoId,
              title: item.snippet.title
            };
          });
        }
      });
  }

  autocompleteOptionSelected(event: MatAutocompleteSelectedEvent) {
    if (event && event.option && event.option.value) {
      const result = event.option.value;
      this.videoPlayerService.playVideo(result);
    }
    this.searchVideosCtrl.setValue('');
  }

}
