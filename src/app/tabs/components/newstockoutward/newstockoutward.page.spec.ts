import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewstockoutwardPage } from './newstockoutward.page';

describe('NewstockoutwardPage', () => {
  let component: NewstockoutwardPage;
  let fixture: ComponentFixture<NewstockoutwardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstockoutwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
