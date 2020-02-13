import { IONECGood } from 'src/app/models/onec.good';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer
} from '@ngrx/store';


export interface OnecState extends EntityState<IONECGood> {

}

export const OnecAdapter = createEntityAdapter<IONECGood>();

export const initialCoursesState = OnecAdapter.getInitialState();


export const OnecReducer  = createReducer(
  initialCoursesState

); 





