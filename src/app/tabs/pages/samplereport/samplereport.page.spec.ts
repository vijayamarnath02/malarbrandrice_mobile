import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SamplereportPage } from './samplereport.page';

describe('SamplereportPage', () => {
  let component: SamplereportPage;
  let fixture: ComponentFixture<SamplereportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
