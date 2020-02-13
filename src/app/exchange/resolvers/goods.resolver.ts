import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class GoodsResolver implements Resolve<any> {


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return of(undefined)
    }



}