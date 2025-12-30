import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EeJsonEditorComponent } from './jsoneditor.component';

describe('EeJsonEditorComponent', () => {
  let component: EeJsonEditorComponent;
  let fixture: ComponentFixture<EeJsonEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EeJsonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EeJsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
