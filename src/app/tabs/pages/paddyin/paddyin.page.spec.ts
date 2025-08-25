import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaddyinPage } from './paddyin.page';

describe('PaddyinPage', () => {
  let component: PaddyinPage;
  let fixture: ComponentFixture<PaddyinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddyinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
