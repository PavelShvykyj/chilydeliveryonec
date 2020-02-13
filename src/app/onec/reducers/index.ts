
import {
  ActionReducer,
 
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  createAction,
  on,
  Action,
  State
} from '@ngrx/store';

import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { environment } from '../../../environments/environment';
import { IONECGood } from 'src/app/models/onec.good';
import { OnecActions } from '../onec.actions.types';


export const FeatureKey = 'OnecState';

export interface OnecState extends EntityState<IONECGood>  {}

export const OnecAdapter = createEntityAdapter<IONECGood>();

export const initialState = OnecAdapter.getInitialState();

export const OnecReducer  = createReducer(
  initialState,
  on(OnecActions.allGoodsLoaded ,(state,action)=>OnecAdapter.addAll(action.goods,state))
); 

export function reducer(state: OnecState | undefined, action: Action) {
  return OnecReducer(state, action);
}



