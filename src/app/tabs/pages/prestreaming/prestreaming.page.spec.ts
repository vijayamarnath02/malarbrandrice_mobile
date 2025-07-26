import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestreamingPage } from './prestreaming.page';

describe('PrestreamingPage', () => {
  let component: PrestreamingPage;
  let fixture: ComponentFixture<PrestreamingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestreamingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
