import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackModalPage } from './track-modal.page';

describe('TrackModalPage', () => {
  let component: TrackModalPage;
  let fixture: ComponentFixture<TrackModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
