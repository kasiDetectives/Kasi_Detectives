import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeAlertPage } from './crime-alert.page';

describe('CrimeAlertPage', () => {
  let component: CrimeAlertPage;
  let fixture: ComponentFixture<CrimeAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeAlertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
