import { NgModule } from '@angular/core';
import { VideoPlayerComponent } from './video-player.component';
import { SharedModule } from '@app/shared';
import { NgxY2PlayerModule } from 'ngx-y2-player';

@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [
    SharedModule,
    NgxY2PlayerModule
  ],
  exports: [VideoPlayerComponent]
})
export class VideoPlayerModule { }
