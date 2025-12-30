import JSONEditor from 'jsoneditor';
import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Input, Output, ViewChild, ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/* eslint-disable @typescript-eslint/ban-types */
class JsonEditorOptions {
    constructor() {
        this.enableSort = true;
        this.enableTransform = true;
        this.escapeUnicode = false;
        this.expandAll = false;
        this.sortObjectKeys = false;
        this.history = true;
        this.mode = 'tree';
        this.search = true;
        this.indentation = 2;
    }
}

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/no-output-native */
class EeJsonEditorComponent {
    constructor() {
        this.options = new JsonEditorOptions();
        this.change = new EventEmitter();
        this.jsonChange = new EventEmitter();
        this.debug = false;
        this.optionsChanged = false;
        this.disabled = false;
        this.isFocused = false;
        this.id = 'angjsoneditor' + Math.floor(Math.random() * 1000000);
        this._data = {};
        this.onChange = () => {
            if (this.editor) {
                try {
                    const json = this.editor.get();
                    this.onChangeModel(json);
                    this.change.emit(json);
                }
                catch (error) {
                    if (this.debug) {
                        console.log(error);
                    }
                }
            }
        };
        this.onChangeJSON = () => {
            if (this.editor) {
                try {
                    this.jsonChange.emit(this.editor.get());
                }
                catch (error) {
                    if (this.debug) {
                        console.log(error);
                    }
                }
            }
        };
        // Implemented as part of ControlValueAccessor.
        this.onTouched = () => {
        };
        // Implemented as part of ControlValueAccessor.
        this.onChangeModel = (e) => {
        };
    }
    set data(value) {
        this._data = value;
        if (this.editor) {
            this.editor.destroy();
            this.ngOnInit();
        }
    }
    ngOnInit() {
        let optionsBefore = this.options;
        if (!this.optionsChanged && this.editor) {
            //TODO: check if this is needed
            optionsBefore = this.editor.options;
        }
        if (!this.options.onChangeJSON && this.jsonChange) {
            this.options.onChangeJSON = this.onChangeJSON;
        }
        if (!this.options.onChange && this.change) {
            this.options.onChange = this.onChange;
        }
        const optionsCopy = Object.assign({}, optionsBefore);
        // expandAll is an option only supported by ees-jsoneditor and not by the the original jsoneditor.
        delete optionsCopy.expandAll;
        if (this.debug) {
            console.log(optionsCopy, this._data);
        }
        if (!this.jsonEditorContainer.nativeElement) {
            console.error(`Can't find the ElementRef reference for jsoneditor)`);
        }
        if (optionsCopy.mode === 'text' || optionsCopy.mode === 'code' ||
            (optionsCopy.modes &&
                (optionsCopy.modes.indexOf('text') !== -1 || optionsCopy.modes.indexOf('code') !== -1))) {
            optionsCopy.onChangeJSON = undefined;
        }
        this.editor = new JSONEditor(this.jsonEditorContainer.nativeElement, optionsCopy, this._data);
        if (this.options.expandAll) {
            this.editor.expandAll();
        }
    }
    ngOnDestroy() {
        this.destroy();
    }
    /**
     * ngModel
     * ControlValueAccessor
     */
    // ControlValueAccessor implementation
    writeValue(value) {
        this.data = value;
    }
    // Implemented as part of ControlValueAccessor
    registerOnChange(fn) {
        this.onChangeModel = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * JSON EDITOR FUNCTIONS
     */
    collapseAll() {
        this.editor.collapseAll();
    }
    expandAll() {
        this.editor.expandAll();
    }
    focus() {
        this.editor.focus();
    }
    get() {
        return this.editor.get();
    }
    getMode() {
        return this.editor.getMode();
    }
    getName() {
        return this.editor.getName();
    }
    getText() {
        return this.editor.getText();
    }
    set(json) {
        this.editor.set(json);
    }
    setMode(mode) {
        this.editor.setMode(mode);
    }
    setName(name) {
        this.editor.setName(name);
    }
    setSelection(start, end) {
        this.editor.setSelection(start, end);
    }
    getSelection() {
        return this.editor.getSelection();
    }
    getValidateSchema() {
        //TODO: check if this is needed
        return this.editor.validateSchema;
    }
    setSchema(schema, schemaRefs) {
        this.editor.setSchema(schema, schemaRefs);
    }
    search(query) {
        //TODO: check if this is needed
        this.editor.search(query);
    }
    setOptions(newOptions) {
        if (this.editor) {
            this.editor.destroy();
        }
        this.optionsChanged = true;
        this.options = newOptions;
        this.ngOnInit();
    }
    update(json) {
        this.editor.update(json);
    }
    destroy() {
        this.editor.destroy();
    }
    getEditor() {
        //TODO: made it any because of the missing type definition
        return this.editor;
    }
    isValidJson() {
        try {
            JSON.parse(this.getText());
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: EeJsonEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: EeJsonEditorComponent, isStandalone: true, selector: "json-editor", inputs: { options: "options", debug: "debug", data: "data" }, outputs: { change: "change", jsonChange: "jsonChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => EeJsonEditorComponent),
                multi: true
            }
        ], viewQueries: [{ propertyName: "jsonEditorContainer", first: true, predicate: ["jsonEditorContainer"], descendants: true, static: true }], ngImport: i0, template: `<div [id]="id" #jsonEditorContainer></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: EeJsonEditorComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'json-editor',
                    standalone: true,
                    template: `<div [id]="id" #jsonEditorContainer></div>`,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => EeJsonEditorComponent),
                            multi: true
                        }
                    ],
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [], propDecorators: { jsonEditorContainer: [{
                type: ViewChild,
                args: ['jsonEditorContainer', { static: true }]
            }], options: [{
                type: Input
            }], change: [{
                type: Output
            }], jsonChange: [{
                type: Output
            }], debug: [{
                type: Input
            }], data: [{
                type: Input,
                args: ['data']
            }] } });

/*
 * Public API Surface of my-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { EeJsonEditorComponent, JsonEditorOptions };
//# sourceMappingURL=ees-jsoneditor.mjs.map
