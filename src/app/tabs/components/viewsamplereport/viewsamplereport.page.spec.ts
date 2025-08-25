import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewsamplereportPage } from './viewsamplereport.page';

describe('ViewsamplereportPage', () => {
  let component: ViewsamplereportPage;
  let fixture: ComponentFixture<ViewsamplereportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsamplereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
