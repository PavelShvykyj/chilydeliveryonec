import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { OnecState } from 'src/app/onec/reducers';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllGoods } from 'src/app/onec/onec.actions';
import { AppState } from 'src/app/reducers';
import { areAllGoodsLoaded } from 'src/app/onec/onec.selectors';


@Injectable()
export class GoodsResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        // return of(undefined);
        return this.store.pipe(
            select(areAllGoodsLoaded),
            tap(GoodsLoaded => {
                
                if (!this.loading && !GoodsLoaded) {
                    this.loading = true;
                    this.store.dispatch(loadAllGoods());
                }
            }),
            filter(GoodsLoaded => GoodsLoaded),
            first(),
            finalize(() => this.loading = false)
        );

    }



}