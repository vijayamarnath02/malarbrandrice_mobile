import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderscreenPage } from './loaderscreen.page';

describe('LoaderscreenPage', () => {
  let component: LoaderscreenPage;
  let fixture: ComponentFixture<LoaderscreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
