import { TestBed } from '@angular/core/testing';

import { GlobalErrorHanlerService } from './global-rerror-hanler.service';

describe('GlobalRerrorHanlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalErrorHanlerService = TestBed.get(GlobalErrorHanlerService);
    expect(service).toBeTruthy();
  });
});
