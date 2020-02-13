import { IONECGood } from './../models/onec.good';
import { createAction, props } from '@ngrx/store';

export const loadAllGoods = createAction("[EXCHANGE GOODS RESOLVER] Load onec goods");
export const allGoodsLoaded = createAction("[LOAD ONEC GOODS EFFECT] Onec goods loaded",props<{goods: IONECGood[]}>());
