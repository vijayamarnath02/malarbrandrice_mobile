import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaddyinwardPage } from './paddyinward.page';

describe('PaddyinwardPage', () => {
  let component: PaddyinwardPage;
  let fixture: ComponentFixture<PaddyinwardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddyinwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
