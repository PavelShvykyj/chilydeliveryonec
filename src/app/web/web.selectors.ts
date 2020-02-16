import { WebState } from './reducers/index';
import * as fromWeb from './reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectWebState = createFeatureSelector<WebState>(fromWeb.webFeatureKey);
export const areAllWebGoodsLoaded = createSelector(
    selectWebState,
    state => state.allGoodsLoaded);

    export const selectAllWebGoods = createSelector(
        selectWebState,
        fromWeb.selectAll // встроеный в адаптер селектор мы его експортировали в файле reducers/index 
    )

    export const selectGoodsByParent = createSelector(
        selectAllWebGoods,
        (goods,props) => goods.filter(element => (element.parentid == props.parentid) || (props.parentid == undefined && element.parentid==""))
    )
    
    export const selectGoodById = createSelector(
        selectAllWebGoods,
        (goods,props) => goods.filter(element => element.id == props.id)
    )
    
    export const selectGoodBySelection = createSelector(
        selectAllWebGoods,
        goods => goods.filter(element => element.isSelected)
    )

