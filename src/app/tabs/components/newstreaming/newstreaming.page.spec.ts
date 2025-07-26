import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewstreamingPage } from './newstreaming.page';

describe('NewstreamingPage', () => {
  let component: NewstreamingPage;
  let fixture: ComponentFixture<NewstreamingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstreamingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
