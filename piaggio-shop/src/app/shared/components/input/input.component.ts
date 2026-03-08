import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	Output,
	Provider,
	ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_COMPONENT_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => InputComponent),
	multi: true,
};

@Component({
	selector: 'os-input',
	standalone: false,
	providers: [INPUT_COMPONENT_ACCESSOR],
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
	@ViewChild('nativeElement') elementRef: ElementRef<HTMLInputElement> | undefined;
	@Input() label: string | undefined;
	@Input() placeholder = '';
	@Input() rtl = false;
	@Input() leadingIcon: string | undefined;
	@Input() trailingIcon: string | undefined;
	@Input() automatic = false;
	@Input() required = false;
	@Input() value: string | number | null = null;
	@Input() alignRight = false;
	@Input() set type(type: 'text' | 'number' | 'integer') {
		switch (type) {
			case 'number':
				this.isNumber = true;
				this.pattern = /^[+-]?[0-9]*[.,]?[0-9]*$/;
				this.formatter = (v) => (v ? v.replace(',', '.') : v); // without parseFloat because it convert 1. to 1
				this.blurFormatter = (v) => {
					let result = '';
					const floatPatter = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
					if (v && floatPatter.test(v)) {
						result = v;
					}

					return result;
				};
				break;
			case 'integer':
				this.isNumber = true;
				this.pattern = /^[+-]?[0-9]*$/;
				this.formatter = (v) => (v ? v.replace(/(,|\.)*/g, '') : v);
				this.blurFormatter = (v) => {
					let result = '';
					const floatPatter = /^[+-]?[0-9]+$/;
					if (v && floatPatter.test(v)) {
						result = parseInt(v).toString();
					}

					return result;
				};
				break;
			default:
				this.pattern = /^.*$/;
				break;
		}
	}
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() blur = new EventEmitter();
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() focus = new EventEmitter();
	disabled = false;
	isNumber = false;

	private pattern = /^.*$/;
	private formatter: (v: string | null) => string | number | null = (v) => v;
	private blurFormatter: (v: string | null) => string | number | null = (v) => v;

	get hasValue() {
		return this.value && String(this.value).length > 0;
	}
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private onChange: (_: string | number | null) => void = () => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private onTouched: (_: string | number | null) => void = () => {};

	setValue(val: string | number | null) {
		this.value = val;
		this.onTouched(val);
		this.onChange(val);
	}

	onInput(event: Event) {
		this.update(event, this.formatter);
	}

	onBlur(event: Event) {
		this.update(event, this.blurFormatter);
		this.blur.emit();
	}

	private update(event: Event, formatter: (v: any) => number | string | null) {
		const target = event.target as HTMLInputElement;
		const val = target.value ? target.value.toString() : null;
		if (!val || this.pattern.test(val)) {
			const formatted = formatter(val);
			this.setValue(formatted);
			if (val !== formatted?.toString()) target.value = formatted?.toString() || '';
		} else target.value = this.value?.toString() || '';
	}

	// control value accessor interface
	writeValue(obj: string | number | null): void {
		this.value = obj;
	}

	registerOnChange(fn: (_: string | number | null) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: (_: string | number | null) => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
	}
}
