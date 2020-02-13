
import { EffectsModule } from '@ngrx/effects';

import { BaseelementsModule } from '../baseelements/baseelements.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnecGoodsDatasourseService } from './onec.goods.datasourse.service';

import { OnecGoodsListComponent } from './onec.goods.list/onec.goods.list.component';
import { MaterialsModule } from '../materials/materials.module';
import { StoreModule } from '@ngrx/store';
import * as fromOnec from './reducers';
import {reducer} from './reducers';
import { OnecEffects } from './onec.effects';


@NgModule({
  declarations: [OnecGoodsListComponent],
  imports: [
    CommonModule,
    BaseelementsModule,
    MaterialsModule,
    EffectsModule.forFeature([OnecEffects]),
    StoreModule.forFeature(fromOnec.FeatureKey, reducer)
  ],
  exports: [OnecGoodsListComponent],
  providers: [OnecGoodsDatasourseService]
})
export class OnecModule { }
