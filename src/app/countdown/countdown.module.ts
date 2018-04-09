import { NgModule, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from './countdown.component';
import { TwoDigitsPipe } from './two-digits.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CountdownComponent, TwoDigitsPipe],
  exports: [ CountdownComponent,  TwoDigitsPipe ]
})
export class CountdownModule {
 }
