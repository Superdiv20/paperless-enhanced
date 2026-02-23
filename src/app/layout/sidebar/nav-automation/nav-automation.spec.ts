import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAutomation } from './nav-automation';

describe('NavAutomation', () => {
  let component: NavAutomation;
  let fixture: ComponentFixture<NavAutomation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavAutomation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAutomation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
