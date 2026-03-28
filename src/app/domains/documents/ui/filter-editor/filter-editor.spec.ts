import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEditor } from './filter-editor';

describe('FilterEditor', () => {
  let component: FilterEditor;
  let fixture: ComponentFixture<FilterEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
