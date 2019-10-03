import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashPage } from './stash.page';

describe('StashPage', () => {
  let component: StashPage;
  let fixture: ComponentFixture<StashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
