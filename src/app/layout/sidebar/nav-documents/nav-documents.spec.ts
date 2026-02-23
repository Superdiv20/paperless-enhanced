import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDocuments } from './nav-documents';

describe('NavDocuments', () => {
  let component: NavDocuments;
  let fixture: ComponentFixture<NavDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
