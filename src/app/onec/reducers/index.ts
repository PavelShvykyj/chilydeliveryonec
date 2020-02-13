import {
  ActionReducer,
 
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { environment } from '../../../environments/environment';
import { IONECGood } from 'src/app/models/onec.good';

export const onecFeatureKey = 'onec';

export interface OnecState extends EntityState<IONECGood>  {};

export const OnecAdapter = createEntityAdapter<IONECGood>();





