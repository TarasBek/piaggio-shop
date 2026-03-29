import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadState,
  VehicleBrand,
  VehicleCategory,
  VehicleModel,
  VehicleYear,
} from '../../../service/state/service-data.models';

import { ServiceApiService } from '../../../service/data-access/service-api.service';

@Component({
  selector: 'app-home-main',
  standalone: false,
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMainComponent implements OnInit {
  heroSlides = [
    {
      eyebrow: 'Vespa & Piaggio',
      title: 'Parts for your scooter — fast, reliable, stylish',
      description:
        'Genuine components and top accessories with delivery across Ukraine.',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
      ctaLabel: 'Go to catalog',
    },
    {
      eyebrow: 'Season ready',
      title: 'Prepare your Vespa for the first rides',
      description:
        'Service kits, consumables, and tips from our mechanics.',
      image:
        'https://images.unsplash.com/photo-1432753759888-b30b2bdac995?auto=format&fit=crop&w=1600&q=80',
      ctaLabel: 'Learn more',
    },
  ];

  brandOptions: Array<{ label: string; value: string }> = [];
  modelOptions: Array<{ label: string; value: string }> = [];
  ccOptions: Array<{ label: string; value: string }> = [];
  yearOptions: Array<{ label: string; value: string }> = [];
  frameTypeOptions: Array<{ label: string; value: string }> = [];
  yearsData: VehicleYear[] = [];

  brandStatus: LoadState = 'idle';
  modelStatus: LoadState = 'idle';
  ccStatus: LoadState = 'idle';
  yearStatus: LoadState = 'idle';
  frameTypeStatus: LoadState = 'idle';
  categoryStatus: LoadState = 'idle';

  brandError: string | null = null;
  modelError: string | null = null;
  ccError: string | null = null;
  yearError: string | null = null;
  frameTypeError: string | null = null;
  categoryError: string | null = null;

  selectedBrandId: string | null = null;
  selectedModelId: string | null = null;
  selectedCc: string | null = null;
  selectedYearId: string | null = null;
  selectedYearValue: number | null = null;
  selectedFrameType: string | null = null;
  selectedCategoryId: string | null = null;
  modelCategories: VehicleCategory[] = [];

  constructor(
    private readonly serviceApi: ServiceApiService,
    private readonly router: Router,
  ) {}

  popularCategories = [
    {
      title: 'Wheels',
      description: 'Original rims and tires',
      image: 'https://cdn-icons-png.flaticon.com/512/3504/3504886.png',
    },
    {
      title: 'Engine',
      description: 'Consumables and upgrades',
      image: 'https://cdn-icons-png.flaticon.com/512/1645/1645094.png',
    },
    {
      title: 'Electrical',
      description: 'Lighting, batteries, wiring',
      image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
    },
    {
      title: 'Oils & filters',
      description: 'Seasonal service kits',
      image: 'https://cdn-icons-png.flaticon.com/512/686/686589.png',
    },
    {
      title: 'Accessories',
      description: 'Windscreens, top cases, style',
      image: 'https://cdn-icons-png.flaticon.com/512/2944/2944127.png',
    },
    {
      title: 'Brakes',
      description: 'Pads and discs',
      image: 'https://cdn-icons-png.flaticon.com/512/4213/4213698.png',
    },
  ];

  popularProducts = [
    {
      name: 'Vespa front wheel',
      price: 1289,
      image:
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
      availability: 'In stock',
    },
    {
      name: 'Spark plug NGK B6HS',
      price: 79,
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      availability: 'In stock',
    },
    {
      name: 'Air filter',
      price: 349,
      image:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
      availability: 'Limited',
    },
    {
      name: 'Front shock absorber',
      price: 759,
      image:
        'https://images.unsplash.com/photo-1466112928291-0903b70a20cd?auto=format&fit=crop&w=600&q=80',
      availability: 'Pre-order',
    },
    {
      name: 'Drive service belt',
      price: 299,
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      availability: 'In stock',
    },
  ];

  benefits = [
    {
      icon: '🚚',
      title: 'Free shipping from €100',
      description: 'Trusted carriers and daily dispatch.',
    },
    {
      icon: '🛠️',
      title: 'Genuine parts',
      description: 'We work directly with Vespa, Piaggio, and Aprilia dealers.',
    },
    {
      icon: '💬',
      title: 'Customer support',
      description: 'Mechanics help you choose the right parts for your model.',
    },
  ];

  blogPosts = [
    {
      title: 'How to prepare your Vespa for the season',
      date: '12 May 2024',
      excerpt: 'Maintenance checklist and fluids to inspect before the first ride.',
      image:
        'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80',
      cta: 'Read',
    },
    {
      title: 'Choosing the perfect windscreen',
      date: '28 April 2024',
      excerpt: 'Explaining the difference between short and touring screens.',
      image:
        'https://images.unsplash.com/photo-1470869784051-0b7e9e87633e?auto=format&fit=crop&w=900&q=80',
      cta: 'Read',
    },
    {
      title: 'Top 5 accessories for city rides',
      date: '09 April 2024',
      excerpt: 'Ideas for extra comfort and safety in traffic.',
      image:
        'https://images.unsplash.com/photo-1471440671318-55bdbb772f93?auto=format&fit=crop&w=900&q=80',
      cta: 'Read',
    },
  ];

  categoryCarouselOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  productCarouselOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  blogCarouselOptions = [
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.brandStatus = 'loading';
    this.brandError = null;
    this.serviceApi.getBrands().subscribe({
      next: (brands: VehicleBrand[]) => {
        this.brandOptions = brands.map((brand) => ({
          label: brand.name,
          value: brand.id,
        }));
        this.brandStatus = 'success';
      },
      error: (error: unknown) => {
        this.brandStatus = 'error';
        this.brandError = this.formatError(error);
      },
    });
  }

  onBrandChange(brandId: string | null): void {
    this.selectedBrandId = brandId || null;
    this.selectedModelId = null;
    this.selectedCc = null;
    this.selectedYearId = null;
    this.selectedYearValue = null;
    this.selectedFrameType = null;
    this.ccOptions = [];
    this.modelOptions = [];
    this.yearOptions = [];
    this.frameTypeOptions = [];
    this.yearsData = [];
    this.ccStatus = 'idle';
    this.modelStatus = 'idle';
    this.yearStatus = 'idle';
    this.frameTypeStatus = 'idle';
    this.categoryStatus = 'idle';
    this.ccError = null;
    this.modelError = null;
    this.yearError = null;
    this.frameTypeError = null;
    this.categoryError = null;
    this.modelCategories = [];
    this.selectedCategoryId = null;

    if (!this.selectedBrandId) {
      return;
    }

    this.modelStatus = 'loading';
    this.serviceApi.getModels(this.selectedBrandId).subscribe({
      next: (models: VehicleModel[]) => {
        this.modelOptions = models.map((model) => ({
          label: model.name,
          value: model.id,
        }));
        this.modelStatus = 'success';
      },
      error: (error: unknown) => {
        this.modelStatus = 'error';
        this.modelError = this.formatError(error);
      },
    });
  }

  onModelChange(modelId: string | null): void {
    this.selectedModelId = modelId || null;
    this.selectedCc = null;
    this.selectedYearId = null;
    this.selectedYearValue = null;
    this.selectedFrameType = null;
    this.selectedCategoryId = null;
    this.ccOptions = [];
    this.yearOptions = [];
    this.frameTypeOptions = [];
    this.yearsData = [];
    this.ccStatus = 'idle';
    this.yearStatus = 'idle';
    this.frameTypeStatus = 'idle';
    this.ccError = null;
    this.yearError = null;
    this.frameTypeError = null;
    this.categoryStatus = 'idle';
    this.categoryError = null;
    this.modelCategories = [];

    if (!this.selectedModelId) {
      return;
    }

    this.ccStatus = 'loading';
    this.serviceApi.getCcs(this.selectedModelId).subscribe({
      next: (ccs: string[]) => {
        this.ccOptions = ccs.map((cc) => ({
          label: cc,
          value: cc,
        }));
        this.ccStatus = 'success';
      },
      error: (error: unknown) => {
        this.ccStatus = 'error';
        this.ccError = this.formatError(error);
      },
    });
  }

  onCcChange(cc: string | null): void {
    this.selectedCc = cc || null;
    this.selectedYearId = null;
    this.selectedYearValue = null;
    this.yearOptions = [];
    this.yearsData = [];
    this.yearStatus = 'idle';
    this.yearError = null;
    this.selectedFrameType = null;
    this.selectedCategoryId = null;
    this.frameTypeOptions = [];
    this.frameTypeStatus = 'idle';
    this.frameTypeError = null;
    this.categoryStatus = 'idle';
    this.categoryError = null;
    this.modelCategories = [];

    if (!this.selectedCc) {
      return;
    }

    this.loadYearsByCc();
  }

  onYearChange(yearId: string | null): void {
    this.selectedYearId = yearId || null;
    this.selectedYearValue = this.resolveYearValue(this.selectedYearId);
    this.selectedFrameType = null;
    this.frameTypeOptions = [];
    this.frameTypeStatus = 'idle';
    this.frameTypeError = null;
    this.selectedCategoryId = null;
    this.categoryStatus = 'idle';
    this.categoryError = null;
    this.modelCategories = [];

    if (!this.selectedBrandId || !this.selectedModelId || !this.selectedYearValue || !this.selectedCc) {
      return;
    }

    this.frameTypeStatus = 'loading';
    this.serviceApi
      .getFrameTypes(
        this.selectedBrandId,
        this.selectedModelId,
        this.selectedYearValue,
        this.selectedCc,
      )
      .subscribe({
        next: (types: string[]) => {
          this.frameTypeOptions = types.map((type) => ({
            label: type,
            value: type,
          }));
          this.frameTypeStatus = 'success';
        },
        error: (error: unknown) => {
          this.frameTypeStatus = 'error';
          this.frameTypeError = this.formatError(error);
        },
      });
  }

  onFrameTypeChange(frameType: string | null): void {
    this.selectedFrameType = frameType || null;
    this.selectedCategoryId = null;
    this.categoryStatus = 'idle';
    this.categoryError = null;
    this.modelCategories = [];

    if (!this.selectedFrameType) {
      return;
    }

    this.loadCategories();
  }

  private loadYearsByCc(): void {
    if (!this.selectedModelId || !this.selectedCc) {
      return;
    }

    const ccValue = this.parseCcValue(this.selectedCc);
    if (ccValue === null) {
      this.yearStatus = 'error';
      this.yearError = 'Invalid CC value';
      return;
    }

    this.yearStatus = 'loading';
    this.yearError = null;
    this.serviceApi.getYears(this.selectedModelId, ccValue).subscribe({
      next: (years: VehicleYear[]) => {
        this.yearsData = years;
        this.yearOptions = years.map((year) => ({
          label: String(year.year),
          value: year.id,
        }));
        this.yearStatus = 'success';
      },
      error: (error: unknown) => {
        this.yearStatus = 'error';
        this.yearError = this.formatError(error);
      },
    });
  }

  onCategorySelect(categoryId: string): void {
    this.selectedCategoryId = categoryId;
  }

  onFindParts(): void {
    if (!this.selectedModelId || !this.selectedFrameType || !this.selectedCc) {
      return;
    }

    this.router.navigate(['/catalog'], {
      queryParams: {
        brandId: this.selectedBrandId ?? undefined,
        modelId: this.selectedModelId,
        cc: this.selectedCc ?? undefined,
        yearId: this.selectedYearId ?? undefined,
        year: this.selectedYearValue ?? undefined,
        frameType: this.selectedFrameType ?? undefined,
        categoryId: this.selectedCategoryId ?? undefined,
      },
    });
  }

  onCategoryDetails(categoryId: string): void {
    if (!this.selectedModelId || !this.selectedFrameType || !this.selectedCc) {
      return;
    }

    this.selectedCategoryId = categoryId;
    this.router.navigate(['/catalog'], {
      queryParams: {
        brandId: this.selectedBrandId ?? undefined,
        modelId: this.selectedModelId,
        cc: this.selectedCc ?? undefined,
        yearId: this.selectedYearId ?? undefined,
        year: this.selectedYearValue ?? undefined,
        frameType: this.selectedFrameType ?? undefined,
        categoryId,
      },
    });
  }

  private loadCategories(): void {
    if (!this.selectedModelId) {
      return;
    }

    this.categoryStatus = 'loading';
    this.categoryError = null;
    this.modelCategories = [];
    this.selectedCategoryId = null;

    this.serviceApi.getCategories(this.selectedModelId, this.selectedYearValue ? String(this.selectedYearValue) : null).subscribe({
      next: (categories: VehicleCategory[]) => {
        this.modelCategories = categories;
        this.categoryStatus = 'success';
      },
      error: (error: unknown) => {
        this.categoryStatus = 'error';
        this.categoryError = this.formatError(error);
      },
    });
  }

  private resolveYearValue(yearId: string | null): number | null {
    if (!yearId) {
      return null;
    }

    const fromList = this.yearsData.find((item) => item.id === yearId)?.year;
    if (fromList) {
      return fromList;
    }

    const asNumber = Number(yearId);
    if (Number.isFinite(asNumber)) {
      return asNumber;
    }

    const maybeYear = yearId.split('-').at(-1);
    const parsed = maybeYear ? Number(maybeYear) : NaN;
    return Number.isFinite(parsed) ? parsed : null;
  }

  private parseCcValue(cc: string): number | null {
    const direct = Number(cc.trim());
    if (Number.isFinite(direct)) {
      return direct;
    }

    const firstNumericChunk = cc.match(/\d+/)?.[0];
    if (!firstNumericChunk) {
      return null;
    }

    const parsed = Number(firstNumericChunk);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private formatError(error: unknown): string {
    if (!error) {
      return 'Unknown error';
    }
    if (typeof error === 'string') {
      return error;
    }
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const maybeMessage = (error as { message?: unknown }).message;
      if (typeof maybeMessage === 'string') {
        return maybeMessage;
      }
    }
    return 'Unable to process request';
  }
}
