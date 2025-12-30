import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityJsonEditorComponent } from './jsoneditor.component';

describe('InfinityJsonEditorComponent', () => {
  let component: InfinityJsonEditorComponent;
  let fixture: ComponentFixture<InfinityJsonEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinityJsonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityJsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
