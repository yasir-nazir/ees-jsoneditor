import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InfinityJsonEditorComponent } from 'ees-jsoneditor';
import { DemoComponent } from './demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        InfinityJsonEditorComponent,
        FormsModule,
        ReactiveFormsModule,
        DemoComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
