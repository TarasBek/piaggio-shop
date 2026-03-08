import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InputComponent } from './input.component';

const addAfterOneChar = (value: string, inputElement: HTMLInputElement) => {
	inputElement.value = '';
	for (const char of value) {
		inputElement.value += char;
		inputElement.focus();
		inputElement.dispatchEvent(new Event('input'));
	}
	inputElement.blur();
};

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InputComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('input with type integer', () => {
		component.type = 'integer';
		const myInput: HTMLInputElement = fixture.nativeElement.querySelector('input');

		addAfterOneChar('100', myInput);
		expect(myInput.value).toBe('100');
		addAfterOneChar('5.4', myInput);
		expect(myInput.value).toBe('54');
		addAfterOneChar('5,4', myInput);
		expect(myInput.value).toBe('54');
		addAfterOneChar('-12', myInput);
		expect(myInput.value).toBe('-12');
		addAfterOneChar('2e3', myInput);
		expect(myInput.value).toBe('23');
		addAfterOneChar('+', myInput);
		expect(myInput.value).toBe('');
		addAfterOneChar('-', myInput);
		expect(myInput.value).toBe('');
	});

	it('input with type number', () => {
		component.type = 'number';
		const myInput: HTMLInputElement = fixture.nativeElement.querySelector('input');

		addAfterOneChar('100', myInput);
		expect(myInput.value).toBe('100');
		addAfterOneChar('5.4', myInput);
		expect(myInput.value).toBe('5.4');
		addAfterOneChar('5,4', myInput);
		expect(myInput.value).toBe('5.4');
		addAfterOneChar('-12', myInput);
		expect(myInput.value).toBe('-12');
		addAfterOneChar('2e3', myInput);
		expect(myInput.value).toBe('23');
		addAfterOneChar('+', myInput);
		expect(myInput.value).toBe('');
		addAfterOneChar('-', myInput);
		expect(myInput.value).toBe('');
	});
});
