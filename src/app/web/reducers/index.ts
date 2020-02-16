import { IWEBGood } from './../../models/web.good';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  Action,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { WebActions } from '../wtb.action.types';


export const webFeatureKey = 'web';

export interface WebState extends EntityState<IWEBGood> {
  allGoodsLoaded: boolean
}

export const WebAdapter = createEntityAdapter<IWEBGood>();

export const initialState = WebAdapter.getInitialState({allGoodsLoaded:false});

export const WebReducer = createReducer(
  initialState,
  on(WebActions.allWebGoodsLoaded ,(state,action)=>WebAdapter.addAll(action.goods,{...state, allGoodsLoaded: true})),
  on(WebActions.statusWebSelectedGanged,  (state,action)=>WebAdapter.updateOne(action.update ,state))
)

export const {selectAll} = WebAdapter.getSelectors();


export function reducer(state: WebState | undefined, action: Action) {
  return WebReducer(state, action);
}


export const metaReducers: MetaReducer<WebState>[] = !environment.production ? [] : [];
