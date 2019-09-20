import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailPage } from './food-detail.page';

describe('FoodDetailPage', () => {
  let component: FoodDetailPage;
  let fixture: ComponentFixture<FoodDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
