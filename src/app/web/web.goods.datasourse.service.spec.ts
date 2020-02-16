import { TestBed } from '@angular/core/testing';

import { Web.Goods.DatasourseService } from './web.goods.datasourse.service';

describe('Web.Goods.DatasourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Web.Goods.DatasourseService = TestBed.get(Web.Goods.DatasourseService);
    expect(service).toBeTruthy();
  });
});
