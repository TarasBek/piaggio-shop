import { Component, EventEmitter, forwardRef, Input, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CHECKBOX_COMPONENT_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CheckboxComponent),
	multi: true,
};

@Component({
	selector: 'os-checkbox',
	standalone: false,
	providers: [CHECKBOX_COMPONENT_ACCESSOR],
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements ControlValueAccessor {
	@Input() label: string | undefined;
	@Input() labelPosition: 'left' | 'right' = 'left';
	@Input() tristate = false;
	@Input() value: boolean | null = false;
	@Input() disabled = false;
	@Input() createTabindex = true;
	@Input() set extDisabled(disabled: boolean) {
		this.setDisabledState(disabled);
	}
	@Output() valueChange = new EventEmitter<boolean | null>();

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private onChange: (_: unknown) => void = () => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private onTouched: (_: unknown) => void = () => {};

	toggle() {
		let newValue: boolean | null = false;
		if (!this.disabled) {
			if (this.tristate) {
				switch (this.value) {
					case null:
						newValue = true;
						break;
					case false:
						newValue = true;
						break;
					case true:
						newValue = null;
						break;
				}
			} else {
				newValue = !this.value;
			}
			this.value = newValue;
			this.valueChange.emit(this.value);
			this.onChange(this.value);
			this.onTouched(this.value);
		}
	}

	// control value accessor interface
	writeValue(obj: boolean | null): void {
		this.value = obj;
	}
	registerOnChange(fn: (_: unknown) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: (_: unknown) => void): void {
		this.onTouched = fn;
	}
	setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
	}
}
