import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHanlerService } from './global-rerror-hanler.service';



@NgModule({
  declarations: [],
  providers: [
    GlobalErrorHanlerService,
    {provide: ErrorHandler, useClass: GlobalErrorHanlerService}],
  imports: [
    CommonModule
  ]
})
export class LoggModule { }
