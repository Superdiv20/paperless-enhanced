import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLibrary } from './nav-library';

describe('NavLibrary', () => {
  let component: NavLibrary;
  let fixture: ComponentFixture<NavLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
