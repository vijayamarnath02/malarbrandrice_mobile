import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OopsPage } from './oops.page';

describe('OopsPage', () => {
  let component: OopsPage;
  let fixture: ComponentFixture<OopsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
