import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaddyoutPage } from './paddyout.page';

describe('PaddyoutPage', () => {
  let component: PaddyoutPage;
  let fixture: ComponentFixture<PaddyoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddyoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
