import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedIncidentPage } from './reported-incident.page';

describe('ReportedIncidentPage', () => {
  let component: ReportedIncidentPage;
  let fixture: ComponentFixture<ReportedIncidentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedIncidentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedIncidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
