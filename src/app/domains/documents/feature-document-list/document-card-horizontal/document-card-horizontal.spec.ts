import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCardHorizontal } from './document-card-horizontal';

describe('DocumentCardHorizontal', () => {
  let component: DocumentCardHorizontal;
  let fixture: ComponentFixture<DocumentCardHorizontal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCardHorizontal],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentCardHorizontal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
