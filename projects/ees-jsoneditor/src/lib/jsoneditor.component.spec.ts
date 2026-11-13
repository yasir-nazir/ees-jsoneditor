import { Component, provideZonelessChangeDetection, signal, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EeJsonEditorComponent } from './jsoneditor.component';
import { JsonEditorOptions } from './jsoneditoroptions';

describe('EeJsonEditorComponent', () => {
  let component: EeJsonEditorComponent;
  let fixture: ComponentFixture<EeJsonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EeJsonEditorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EeJsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the data passed in', () => {
    component.data = { name: 'civic' };
    expect(component.get()).toEqual({ name: 'civic' } as any);
  });

  it('should emit (change) with the parsed JSON', () => {
    const emitted: unknown[] = [];
    component.change.subscribe(value => emitted.push(value));

    component.set({ a: 1 } as any);
    component.onChange();

    expect(emitted).toEqual([{ a: 1 }]);
  });

  it('should rebuild the editor with new options', () => {
    const options = new JsonEditorOptions();
    options.mode = 'code';
    component.setOptions(options);
    expect(component.getMode()).toBe('code');
  });
});

@Component({
  imports: [EeJsonEditorComponent, ReactiveFormsModule, JsonPipe],
  template: `
    <json-editor [data]="data" (change)="last.set($event)"></json-editor>
    <json-editor [formControl]="control"></json-editor>
    <span id="last">{{ last() | json }}</span>
  `
})
class ZonelessHostComponent {
  @ViewChild(EeJsonEditorComponent) editor!: EeJsonEditorComponent;
  data = { start: true };
  last = signal<unknown>(null);
  control = new FormControl<unknown>({ fromForm: 1 });
}

describe('EeJsonEditorComponent (zoneless app)', () => {
  let fixture: ComponentFixture<ZonelessHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonelessHostComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZonelessHostComponent);
    await fixture.whenStable();
  });

  it('should update the host view when (change) fires', async () => {
    const editor = fixture.componentInstance.editor;
    editor.set({ edited: true } as any);
    editor.onChange();
    await fixture.whenStable();

    const text = fixture.nativeElement.querySelector('#last').textContent;
    expect(JSON.parse(text)).toEqual({ edited: true });
  });

  it('should sync with a FormControl both ways', async () => {
    const host = fixture.componentInstance;
    const formEditor = fixture.debugElement
      .queryAll(By.directive(EeJsonEditorComponent))[1]
      .componentInstance as EeJsonEditorComponent;

    expect(formEditor.get()).toEqual({ fromForm: 1 } as any);

    formEditor.set({ fromEditor: 2 } as any);
    formEditor.onChange();
    expect(host.control.value).toEqual({ fromEditor: 2 });

    host.control.setValue({ fromCode: 3 });
    await fixture.whenStable();
    expect(formEditor.get()).toEqual({ fromCode: 3 } as any);
  });
});
