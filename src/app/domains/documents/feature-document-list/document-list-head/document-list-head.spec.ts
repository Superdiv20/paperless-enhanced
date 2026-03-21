import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentListHead } from './document-list-head';
import { DisplayMode } from '../../data/models/display-mode';

describe('DocumentListHead', () => {
  let component: DocumentListHead;
  let fixture: ComponentFixture<DocumentListHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentListHead],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentListHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with list display mode', () => {
    expect(component['displayMode']()).toBe(DisplayMode.LIST);
  });

  it('should change display mode', () => {
    component['onDisplayModeChange'](DisplayMode.TABLE);
    expect(component['displayMode']()).toBe(DisplayMode.TABLE);
  });

  it('should update search query', () => {
    component['onSearchChange']('test query');
    expect(component['searchQuery']()).toBe('test query');
  });
});
