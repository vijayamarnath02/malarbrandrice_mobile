import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WetpaddyPage } from './wetpaddy.page';

describe('WetpaddyPage', () => {
  let component: WetpaddyPage;
  let fixture: ComponentFixture<WetpaddyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WetpaddyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
