import { element } from 'protractor';
import * as fromOnec from './reducers/index';
import { OnecState } from './reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectOnecState = createFeatureSelector<OnecState>(fromOnec.FeatureKey);

export const selectAllGoods = createSelector(
    selectOnecState,
    fromOnec.selectAll
)

export const selectGoodsByParent = createSelector(
    selectAllGoods,
    (goods,props) => goods.filter(element => element.parentid == props.parentid)
)

export const selectGoodById = createSelector(
    selectAllGoods,
    (goods,props) => goods.filter(element => element.id == props.id)
)

export const areAllGoodsLoaded = createSelector(
    selectOnecState,
    state => state.allGoodsLoaded 
)

