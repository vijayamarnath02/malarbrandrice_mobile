import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockinwardPage } from './stockinward.page';

describe('StockinwardPage', () => {
  let component: StockinwardPage;
  let fixture: ComponentFixture<StockinwardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockinwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
