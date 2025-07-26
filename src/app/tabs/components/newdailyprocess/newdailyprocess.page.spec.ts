import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewdailyprocessPage } from './newdailyprocess.page';

describe('NewdailyprocessPage', () => {
  let component: NewdailyprocessPage;
  let fixture: ComponentFixture<NewdailyprocessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdailyprocessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
