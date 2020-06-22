import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHanlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any) {
    
    let ErrMessage  =  {
      'err':error,
      'date': new Date()
    };
    
    if(xForm1C == undefined)  {
      //alert('ПОТЕРЯНА СВЯЗЬ С ИНТЕНЕТ И 1С ПЕРЕЗАГРУЗИТЕ ПРОГРАММУ!!!');
    } else {
      xForm1C.OnConnectionStatusChanged(JSON.stringify(ErrMessage));
    }


    throw error;
    

 } 

}
