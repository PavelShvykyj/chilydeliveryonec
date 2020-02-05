import { TestBed } from '@angular/core/testing';

import { Onec.Goods.DatasourseService } from './onec.goods.datasourse.service';

describe('Onec.Goods.DatasourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Onec.Goods.DatasourseService = TestBed.get(Onec.Goods.DatasourseService);
    expect(service).toBeTruthy();
  });
});
