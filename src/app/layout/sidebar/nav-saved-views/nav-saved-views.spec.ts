import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSavedViews } from './nav-saved-views';

describe('NavSavedViews', () => {
  let component: NavSavedViews;
  let fixture: ComponentFixture<NavSavedViews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSavedViews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSavedViews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
