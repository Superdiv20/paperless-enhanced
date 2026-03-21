import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCardVertical } from './document-card-vertical';

describe('DocumentCardVertical', () => {
  let component: DocumentCardVertical;
  let fixture: ComponentFixture<DocumentCardVertical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCardVertical],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentCardVertical);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
