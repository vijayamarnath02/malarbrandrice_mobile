import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SamplepagePage } from './samplepage.page';

describe('SamplepagePage', () => {
  let component: SamplepagePage;
  let fixture: ComponentFixture<SamplepagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
