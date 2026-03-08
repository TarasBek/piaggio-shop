import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostListener,
	Input,
	Output,
	Provider,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Option<T> {
	value: T;
	label: string;
	selected?: boolean;
}

const SELECT_COMPONENT_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SelectComponent),
	multi: true,
};

function isEqualValue(left: unknown, right: unknown): boolean {
	if (Object.is(left, right)) {
		return true;
	}

	if (left instanceof Date && right instanceof Date) {
		return left.getTime() === right.getTime();
	}

	if (typeof left !== 'object' || typeof right !== 'object' || left === null || right === null) {
		return false;
	}

	if (Array.isArray(left) || Array.isArray(right)) {
		if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
			return false;
		}
		return left.every((item, index) => isEqualValue(item, right[index]));
	}

	const leftObj = left as Record<string, unknown>;
	const rightObj = right as Record<string, unknown>;
	const leftKeys = Object.keys(leftObj);
	const rightKeys = Object.keys(rightObj);
	if (leftKeys.length !== rightKeys.length) {
		return false;
	}

	return leftKeys.every((key) => key in rightObj && isEqualValue(leftObj[key], rightObj[key]));
}

@Component({
	selector: 'os-select',
	standalone: false,
	providers: [SELECT_COMPONENT_ACCESSOR],
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
})
export class SelectComponent<T> implements ControlValueAccessor {
	@ViewChild('wrapper') wrapper?: ElementRef<HTMLDivElement>;
	@ViewChild('inputFilter') inputFilter?: ElementRef<HTMLInputElement>;
	@ViewChildren('item') optionElements?: QueryList<ElementRef<HTMLDivElement>>;

	@Input() set options(options: Option<T>[]) {
		this._options = options;
		this._filteredOptions = options;

		if (options.some((x) => x.selected)) {
			if (this.hasServerSource) {
				this.toggle(options.find((x) => x.selected));
			} else {
				this.updateSelectedOptions();
			}
		}
	}

	@Input() set extDisabled(disabled: boolean) {
		this.setDisabledState(disabled);
	}

	@Input() disabled = false;
	@Input() boldLabel = false;
	@Input() label: string | undefined;
	@Input() placeholder: string | undefined;
	@Input() defaultValue: T | undefined;
	@Input() required = false;
	@Input() emptyOption = true;
	@Input() multi = false;
	@Input() automatic = false;
	@Input() scrollbar = false;
	@Input() maxHeight = '100px';
	@Input() isFilter = false;
	@Input() hasServerSource = false;
	@Output() filterChanged = new EventEmitter<string>();
	@Input() allOption = false;

	_options: Option<T>[] = [];
	activeOption: Option<T> | null = null;
	opened = false;
	hasValue = false;
	displayValue = '';
	filterValue = '';
	filteredControl = new FormControl('');
	_filteredOptions: Option<T>[] = [];
	allChecked: boolean | null = false;

	private activeOptionIndex = -1;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private onChange: (_: unknown | unknown[]) => void = () => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private onTouched: (_: unknown | unknown[]) => void = () => {};

	@HostListener('document:click', ['$event.target'])
	clickedOut(target: any) {
		const clickInside = this.wrapper?.nativeElement.contains(target);
		if (!clickInside) {
			if (this.opened) {
				this.setOpened(false);
			}
		}
	}

	toggle(option: Option<T> | undefined = undefined) {
		this.toggleInner(option);
		this.updateSelectedOptions();
		if (!this.multi) {
			this.setOpened(false);
		}
	}

	toggleAll() {
		this._options = this._options.map((oldOption) => ({
			...oldOption,
			selected: this.allChecked ? false : true,
		}));
		this.allChecked = !this.allChecked;

		this.updateSelectedOptions();
		if (!this.multi) {
			this.setOpened(false);
		}
	}

	updateSelectedOptions() {
		const values = this._options.filter((x) => x.selected).map((x) => x.value);
		this.onChange(this.multi ? values : values[0]);
		this.onTouched(this.multi ? values : values[0]);
		this.updateDisplayText(this._options);
	}

	writeValue(value: unknown | unknown[]): void {
		if (Array.isArray(value)) {
			if (value.length) {
				this._options
					.filter((x) => x.selected)
					.map((x) => x.value)
					.filter((x) => !value.map((v) => v?.value ?? v).includes(x))
					.forEach((x) => {
						this.checkAndToggle(x);
					});
			} else {
				this.allChecked = true;
				this.toggleAll();
			}
		} else {
			this.checkAndToggle(value);
		}
	}

	registerOnChange(fn: (_: unknown | unknown[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: (_: unknown | unknown[]) => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
	}

	setOpenedEvent(event: Event, value: boolean) {
		event.stopPropagation();
		this.setOpened(value);
	}

	setOpened(value: boolean) {
		const blur = () => {
			this.opened = value;
			if (!value) this.inputFilter?.nativeElement.blur();
		};
		if (this.filterValue) setTimeout(() => blur(), 10);
		else blur();
	}

	onFilterInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const val = target.value ? target.value.toString() : '';
		if (this.hasServerSource && val.length > 2) {
			this.filterChanged.emit(val);
			setTimeout(() => this.inputFilter?.nativeElement.click(), 1000);
		} else {
			this._filteredOptions = this._options.filter((x) =>
				x.label?.toLowerCase().startsWith((val || '').toLowerCase()),
			);
			if (this._filteredOptions.length) {
				this.activeOption = this._filteredOptions[0];
			}
		}
		this.filterValue = val;
	}

	onKeyPress(event: KeyboardEvent, optionElements: QueryList<ElementRef<HTMLDivElement>>) {
		switch (event.key) {
			case 'Backspace':
				if (!this.isFilter) {
					event.preventDefault();
					this.toggle();
				} else {
					if (this.filterValue.length === 0) {
						this.toggle();
					}
				}
				break;
			case 'Escape':
				event.preventDefault();
				this.setOpened(false);
				break;
			case 'Enter':
				event.preventDefault();
				this.writeValue(this.activeOption);
				this.setOpened(false);
				break;
			case 'ArrowUp':
				event.preventDefault();
				this.setOpened(true);
				this.activeOptionIndex = Math.max(this.required ? 0 : -1, this.activeOptionIndex - 1);
				this.activeOption = this._options[this.activeOptionIndex];
				optionElements
					?.toArray()
					[this.activeOptionIndex + (this.required ? 1 : 0)]?.nativeElement.scrollIntoView({
						block: 'center',
						behavior: 'smooth',
					});
				break;
			case 'ArrowDown':
				event.preventDefault();
				this.setOpened(true);
				this.activeOptionIndex = Math.min(this._options.length - 1, this.activeOptionIndex + 1);
				this.activeOption = this._options[this.activeOptionIndex];
				optionElements
					?.toArray()
					[this.activeOptionIndex + (this.required ? 1 : 0)]?.nativeElement.scrollIntoView({
						block: 'center',
						behavior: 'smooth',
					});
				break;
		}
	}

	private updateDisplayText(options: Option<T>[]) {
		const selectedItems = options.filter((x) => x.selected);
		const seen = Object.create(null);
		this.displayValue = selectedItems.length
			? selectedItems
					.filter((x) => {
						const key = x.value + '|' + x.label;
						const keep = !seen[key];
						if (keep) seen[key] = true;
						return keep;
					})
					.map((x) => x.label)
					.reduce((a, b) => `${a}, ${b}`)
			: '';
		this.hasValue = options.some((x) => x.selected);
	}

	private checkAndToggle(value: unknown) {
		if (this.isOption(value)) {
			this.toggleInner(value as Option<T>);
		} else {
			const fn =
				typeof value === 'object'
					? (opt: Option<T>) => isEqualValue(opt.value, value)
					: (opt: Option<T>) => opt.value === value;
			const option = this._options.find(fn);
			this.toggleInner(option);
		}
	}

	private isOption(option: unknown): option is Option<unknown> {
		const opt = <Option<unknown>>option;
		return !!opt?.value && !!opt?.label;
	}

	private toggleInner(option: Option<T> | undefined) {
		this._options.forEach((oldOption) => {
			if (!option) {
				if (oldOption.selected) {
					oldOption['selected'] = false;
				}
				if (this.defaultValue && oldOption.value === this.defaultValue) {
					oldOption['selected'] = true;
				}
			} else {
				if (isEqualValue(oldOption.value, option.value)) {
					oldOption['selected'] = this.multi ? !option.selected : true;
				} else if (!this.multi) {
					oldOption['selected'] = false;
				}
			}
		});

		const checkedCounter = this._options.reduce(
			(total, option) => (option.selected ? total + 1 : total),
			0,
		);

		this.allChecked = checkedCounter
			? checkedCounter === this._options.length
				? true
				: null
			: false;
	}
}
