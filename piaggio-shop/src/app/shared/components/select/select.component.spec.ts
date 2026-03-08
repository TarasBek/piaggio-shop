import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from '@oversea/ui/icon';
import { TooltipModule } from '@oversea/ui/tooltip';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Option, SelectComponent } from './select.component';
import { Vessel } from '@oversea/models';
import { cloneDeep } from 'lodash';

@Component({
	template: `
		<os-select
			[placeholder]="'Test placeholder'"
			[formControl]="vesselsControl"
			[options]="vessels"
			[multi]="multi"
		></os-select>
	`,
})
class TestSelectComponent {
	vesselsControl = new FormControl<Vessel[]>([], { nonNullable: true });
	vessels: Option<Vessel>[] = [];
	multi = false;
}

describe('SelectComponent', () => {
	const vessels: Option<Vessel>[] = [
		{
			label: 'Apple',
			value: {
				id: '4dd1fcc5-0eab-49a1-9a64-7c2c6fa2941e',
				imo: '2222222',
				name: 'Apple',
				vesselType: '',
				longitude: 0,
				latitude: 0,
				direction: 0,
				locationTimestamp: new Date(),
			},
			selected: true,
		},
		{
			label: 'Traviata',
			value: {
				id: '4D2E37F0-B1C0-4F3A-AB99-A03EF7F7D567',
				imo: '1111111',
				name: 'Traviata',
				vesselType: '',
				longitude: 0,
				latitude: 0,
				direction: 0,
				locationTimestamp: new Date(),
			},
			selected: false,
		},
		{
			label: 'Aniara',
			value: {
				id: '9377494',
				imo: '9377494',
				name: 'Aniara',
				vesselType: '',
				longitude: 0,
				latitude: 0,
				direction: 0,
				locationTimestamp: new Date(),
			},
			selected: true,
		},
	];
	let selectComponent: SelectComponent<Vessel>;
	let testFixture: ComponentFixture<TestSelectComponent>;
	let testComponent: TestSelectComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectComponent, TestSelectComponent],
			imports: [
				HttpClientTestingModule,
				FormsModule,
				ReactiveFormsModule,
				IconModule,
				TooltipModule,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		testFixture = TestBed.createComponent<TestSelectComponent>(TestSelectComponent);
		testComponent = testFixture.componentInstance;
		selectComponent = testFixture.debugElement.children[0]
			.componentInstance as SelectComponent<Vessel>;
	});

	afterEach(() => {
		testFixture.destroy();
	});

	it('should contains placeholder', () => {
		testFixture.detectChanges();
		const actual = selectComponent.placeholder;
		expect(actual).toMatch('Test placeholder');
	});

	it('should set dropdown options', () => {
		testComponent.vessels = cloneDeep(vessels);
		testFixture.detectChanges();
		const actual = selectComponent._options;
		const expected = vessels;
		// TODO A problem is with select value - true vs. false
		expect(actual.map((v) => v.value)).toEqual(
			expect.arrayContaining(expected.map((v) => v.value)),
		);
	});

	it('should update form contol value to contain selected items only', () => {
		testComponent.multi = true;
		testFixture.detectChanges();
		testComponent.vessels = cloneDeep(vessels);
		testFixture.detectChanges();
		const actual = testComponent.vesselsControl.value;
		const expected = vessels.filter((v) => v.selected === true).map((option) => option.value);
		expect(actual).toEqual(expect.arrayContaining(expected));
	});
});
