import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSecondary } from './nav-secondary';

describe('NavSecondary', () => {
  let component: NavSecondary;
  let fixture: ComponentFixture<NavSecondary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSecondary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSecondary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
