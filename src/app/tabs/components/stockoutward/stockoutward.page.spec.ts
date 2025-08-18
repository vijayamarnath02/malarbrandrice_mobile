import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockoutwardPage } from './stockoutward.page';

describe('StockoutwardPage', () => {
  let component: StockoutwardPage;
  let fixture: ComponentFixture<StockoutwardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockoutwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
