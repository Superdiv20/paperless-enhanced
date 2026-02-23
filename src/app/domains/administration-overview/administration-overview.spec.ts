import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationOverview } from './administration-overview';

describe('AdministrationOverview', () => {
  let component: AdministrationOverview;
  let fixture: ComponentFixture<AdministrationOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
