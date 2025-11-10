import { Component } from '@angular/core';

@Component({
  selector: 'app-home-main',
  standalone: false,
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent {

  brandOptions = [
    { label: 'Piaggio', value: 'piaggio' },
    { label: 'Vespa', value: 'vespa' },
    { label: 'Aprilia', value: 'aprilia' },
    { label: 'Moto Guzzi', value: 'moto-guzzi' },
  ];

  modelOptions = [
    { label: 'Primavera', value: 'primavera' },
    { label: 'Sprint', value: 'sprint' },
    { label: 'GTS', value: 'gts' },
    { label: 'MP3 500', value: 'mp3-500' },
  ];

  yearOptions = [
    { label: '2024', value: 2024 },
    { label: '2023', value: 2023 },
    { label: '2022', value: 2022 },
    { label: '2021', value: 2021 },
  ];

  selectedBrand?: string;
  selectedModel?: string;
  selectedYear?: number;
}
