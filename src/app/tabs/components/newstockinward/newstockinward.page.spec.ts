import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewstockinwardPage } from './newstockinward.page';

describe('NewstockinwardPage', () => {
  let component: NewstockinwardPage;
  let fixture: ComponentFixture<NewstockinwardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstockinwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
