import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdministration } from './nav-administration';

describe('NavAdministration', () => {
  let component: NavAdministration;
  let fixture: ComponentFixture<NavAdministration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavAdministration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAdministration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
