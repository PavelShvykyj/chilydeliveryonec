import { IWEBGood } from './../models/web.good';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const loadAllWebGoods = createAction("[EXCHANGE GOODS RESOLVER] Load web goods");
export const allWebGoodsLoaded = createAction("[LOAD WEB GOODS EFFECT] Web goods loaded",props<{goods: IWEBGood[]}>());
export const statusWebSelectedGanged = createAction("[WEB GOODS LIST COMPONENT]  Status selected changed",props<{update: Update<IWEBGood>}>());