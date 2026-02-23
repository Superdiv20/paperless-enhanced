import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOrganize } from './nav-organize';

describe('NavOrganize', () => {
  let component: NavOrganize;
  let fixture: ComponentFixture<NavOrganize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavOrganize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavOrganize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
