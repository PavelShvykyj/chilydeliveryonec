import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsExchangeComponent } from './goods-exchange.component';

describe('GoodsExchangeComponent', () => {
  let component: GoodsExchangeComponent;
  let fixture: ComponentFixture<GoodsExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
