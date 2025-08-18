import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaddyoutwardPage } from './paddyoutward.page';

describe('PaddyoutwardPage', () => {
  let component: PaddyoutwardPage;
  let fixture: ComponentFixture<PaddyoutwardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddyoutwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
