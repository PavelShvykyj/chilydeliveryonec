import { element } from 'protractor';
import * as fromOnec from './reducers/index';
import { OnecState } from './reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectOnecState = createFeatureSelector<OnecState>(fromOnec.FeatureKey);

export const selectAllGoods = createSelector(
    selectOnecState,
    fromOnec.selectAll // встроеный в адаптер селектор мы его експортировали в файле reducers/index 
)

export const selectGoodsByParent = createSelector(
    selectAllGoods,
    (goods,props) => goods.filter(element => element.parentid == props.parentid)
)

export const selectGoodById = createSelector(
    selectAllGoods,
    (goods,props) => goods.filter(element => element.id == props.id)
)

export const selectGoodBySelection = createSelector(
    selectAllGoods,
    goods => goods.filter(element => element.isSelected)
)

export const areAllGoodsLoaded = createSelector(
    selectOnecState,
    state => state.allGoodsLoaded 
)

