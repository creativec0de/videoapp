import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { SearchComponent } from './search.component';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
