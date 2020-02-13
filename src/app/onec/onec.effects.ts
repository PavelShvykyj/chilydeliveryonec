import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OnecActions } from './onec.actions.types';
import { OnecGoodsDatasourseService } from './onec.goods.datasourse.service';
import { concatMap, map } from 'rxjs/operators';
import { allGoodsLoaded } from './onec.actions';


@Injectable()
export class OnecEffects {

    loadOnecGoods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OnecActions.loadAllGoods),
            concatMap(action => { this.OnecServise.GetList(undefined); return this.OnecServise.dataSourse$ }),
            map(goods => allGoodsLoaded({ goods: [] }))
        )
    )


    constructor(private actions$: Actions, private OnecServise: OnecGoodsDatasourseService) {


    }
}