

import { BaseelementsModule } from '../baseelements/baseelements.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnecGoodsDatasourseService } from './onec.goods.datasourse.service';

import { OnecGoodsListComponent } from './onec.goods.list/onec.goods.list.component';
import { MaterialsModule } from '../materials/materials.module';
import { StoreModule } from '@ngrx/store';
import * as fromOnec from './reducers';


@NgModule({
  declarations: [OnecGoodsListComponent],
  imports: [
    CommonModule,
    BaseelementsModule,
    MaterialsModule,
    StoreModule.forFeature(fromOnec.onecFeatureKey, fromOnec.reducers, { metaReducers: fromOnec.metaReducers })
  ],
  exports: [OnecGoodsListComponent],
  providers: [OnecGoodsDatasourseService]
})
export class OnecModule { }
