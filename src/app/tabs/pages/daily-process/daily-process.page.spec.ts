import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyProcessPage } from './daily-process.page';

describe('DailyProcessPage', () => {
  let component: DailyProcessPage;
  let fixture: ComponentFixture<DailyProcessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
