import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegcompletePage } from './regcomplete.page';

describe('RegcompletePage', () => {
  let component: RegcompletePage;
  let fixture: ComponentFixture<RegcompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegcompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegcompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
