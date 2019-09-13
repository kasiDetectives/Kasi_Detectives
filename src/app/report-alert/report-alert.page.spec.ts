import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAlertPage } from './report-alert.page';

describe('ReportAlertPage', () => {
  let component: ReportAlertPage;
  let fixture: ComponentFixture<ReportAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAlertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
