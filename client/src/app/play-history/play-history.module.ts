import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayHistoryComponent } from './play-history.component';
import { SharedModule } from '@app/shared';



@NgModule({
  declarations: [PlayHistoryComponent],
  imports: [
      SharedModule,
  ],
  exports: [PlayHistoryComponent]
})
export class PlayHistoryModule { }
