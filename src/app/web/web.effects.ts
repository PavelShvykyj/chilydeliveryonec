import { WebGoodsDatasourseService } from './web.goods.datasourse.service';

import { allWebGoodsLoaded } from './web.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WebActions } from './wtb.action.types';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class WebEffects {

    loadOnecGoods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WebActions.loadAllWebGoods),
            concatMap(action => {console.log('web effect'); return this.WebServise.GetAllGoods();  }),
            map(allgoods => allWebGoodsLoaded({ ...allgoods }))
        )
    )


    constructor(private actions$: Actions, private WebServise: WebGoodsDatasourseService) {
    }
}