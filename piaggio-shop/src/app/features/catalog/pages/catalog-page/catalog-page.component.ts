import { Component } from '@angular/core';

type Availability = 'In stock' | 'Limited' | 'Pre-order';

interface CatalogSubcategory {
  id: string;
  label: string;
  image?: string;
}

interface CatalogSubcategoryItem {
  id: string;
  label: string;
  children?: CatalogSubcategoryItem[];
}

interface CatalogSubcategorySection {
  id: string;
  label: string;
  image?: string;
  items: CatalogSubcategoryItem[];
}

interface CatalogCategory {
  id: string;
  label: string;
  subcategories?: CatalogSubcategory[];
  sections?: CatalogSubcategorySection[];
}

interface CatalogProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategoryLabel: string;
  categoryId: string;
  subcategoryId: string;
  compatibility: string[];
  price: number;
  availability: Availability;
  rating: number;
  reviews: number;
  image?: string;
  imageFailed?: boolean;
  badge?: string;
}

type FilterKey = 'brand' | 'category' | 'compatibility' | 'availability';

interface SelectedFilters {
  brand: string[];
  category: string[];
  compatibility: string[];
  availability: string[];
}

@Component({
  selector: 'app-catalog-page',
  standalone: false,
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss',
})
export class CatalogPageComponent {
  categories: CatalogCategory[] = [
    {
      id: 'motor',
      label: 'Motor',
      sections: [
        {
          id: 'cylinders',
          label: 'Cylinder & Piston',
          items: [
            { id: 'cpg-kits', label: 'Piston kits' },
            {
              id: 'pistons',
              label: 'Pistons',
              children: [
                { id: 'pistons-2t', label: '2T pistons' },
                { id: 'pistons-4t', label: '4T pistons' },
                { id: 'pistons-moto', label: 'Moto pistons' },
              ],
            },
            { id: 'cpg-rings', label: 'Piston rings' },
            { id: 'cpg-gaskets', label: 'Gaskets & seals' },
            { id: 'cpg-pins', label: 'Pins & clips' },
          ],
        },
        {
          id: 'crankshaft',
          label: 'Crankshaft',
          items: [
            { id: 'crankshaft-body', label: 'Crankshafts' },
            { id: 'crankshaft-bearings', label: 'Bearings' },
            { id: 'crankshaft-seals', label: 'Oil seals' },
            { id: 'crankshaft-needle', label: 'Needle bearings' },
          ],
        },
        {
          id: 'carb',
          label: 'Carburetor',
          items: [
            { id: 'carbs', label: 'Carbs' },
            { id: 'carb-cables', label: 'Cables' },
            { id: 'carb-jets', label: 'Jets' },
            { id: 'carb-parts', label: 'Carb parts' },
            { id: 'carb-valves', label: 'Valves & hoses' },
          ],
        },
        {
          id: 'intake',
          label: 'Intake',
          items: [
            { id: 'intake-valves', label: 'Valves' },
            { id: 'intake-reeds', label: 'Reed petals' },
            { id: 'intake-manifolds', label: 'Manifolds' },
            { id: 'intake-systems', label: 'Intake systems' },
          ],
        },
        {
          id: 'exhaust',
          label: 'Exhaust',
          items: [
            { id: 'exhaust-pipes', label: 'Pipes' },
            { id: 'exhaust-packing', label: 'Silencer packing' },
            { id: 'exhaust-accessories', label: 'Accessories & springs' },
          ],
        },
        {
          id: 'cooling',
          label: 'Cooling',
          items: [
            { id: 'cooling-kits', label: 'Service kits' },
            { id: 'cooling-shrouds', label: 'Covers & ducts' },
            { id: 'cooling-pumps', label: 'Water pumps' },
            { id: 'cooling-radiators', label: 'Radiators & hoses' },
            { id: 'cooling-seals', label: 'Seals & hardware' },
          ],
        },
        {
          id: 'filters',
          label: 'Filters',
          items: [
            { id: 'filter-air', label: 'Air filters' },
            { id: 'filter-box', label: 'Filter boxes' },
            { id: 'filter-zero', label: 'Performance filters' },
            { id: 'filter-fuel', label: 'Fuel filters' },
            { id: 'filter-oil', label: 'Oil filters' },
          ],
        },
      ],
    },
    {
      id: 'transmission',
      label: 'Transmission',
      sections: [
        {
          id: 'clutches-section',
          label: 'Clutches',
          image: 'https://images.unsplash.com/photo-1582967788606-a0dbc9c88089?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'clutches', label: 'Complete clutches' },
            { id: 'clutch-springs', label: 'Springs & weights' },
            { id: 'clutch-plates', label: 'Friction plates' },
          ],
        },
        {
          id: 'gearbox-section',
          label: 'Gearboxes',
          image: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'primary-gears', label: 'Primary gears' },
            { id: 'final-drives', label: 'Final drives' },
            { id: 'gear-bearings', label: 'Gear bearings' },
          ],
        },
        {
          id: 'chains-section',
          label: 'Chains & belts',
          image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'chains', label: 'Drive chains' },
            { id: 'chain-tools', label: 'Chain tools' },
            { id: 'chain-guards', label: 'Covers & guards' },
          ],
        },
      ],
    },
    {
      id: 'electrics',
      label: 'Electrics',
      sections: [
        {
          id: 'lighting-section',
          label: 'Lighting',
          image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'lighting', label: 'LED kits' },
            { id: 'lighting-bulbs', label: 'Headlight bulbs' },
            { id: 'lighting-indicators', label: 'Indicators & wiring' },
          ],
        },
        {
          id: 'battery-section',
          label: 'Batteries',
          image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'batteries', label: 'Lithium batteries' },
            { id: 'battery-accessories', label: 'Chargers & tenders' },
            { id: 'battery-mounts', label: 'Mounts & cases' },
          ],
        },
        {
          id: 'instrument-section',
          label: 'Instruments',
          image: 'https://images.unsplash.com/photo-1529429617124-aee711a70412?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'sensors', label: 'Sensors' },
            { id: 'dashboards', label: 'Dashboards & displays' },
            { id: 'switchgear', label: 'Switchgear' },
          ],
        },
      ],
    },
    {
      id: 'styling',
      label: 'Styling',
      sections: [
        {
          id: 'mirrors-section',
          label: 'Mirrors',
          image: 'https://images.unsplash.com/photo-1516115773302-2ed3c3437a33?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'mirrors', label: 'Retro mirrors' },
            { id: 'mirror-mounts', label: 'Adapters & mounts' },
          ],
        },
        {
          id: 'windscreens-section',
          label: 'Windscreens',
          image: 'https://images.unsplash.com/photo-1470869784051-0b7e9e87633e?auto=format&fit=crop&w=640&q=60',
          items: [
            { id: 'windscreens', label: 'Touring screens' },
            { id: 'windscreen-accessories', label: 'Mounts & trim' },
          ],
        },
      ],
    },
  ];

  selectedCategoryId = this.categories[0].id;
  selectedSubcategoryId: string | null = null;
  expandedItems = new Set<string>();
  selectedSectionId: string | null = null;
  selectedItemLabel: string | null = null;
  showAllSidebarSubcategories = false;

  heroHighlights = [
    { icon: '⚡', label: 'Fast EU delivery' },
    { icon: '🛠️', label: 'OEM guaranteed' },
    { icon: '💬', label: 'Mechanic support' },
  ];

  filterDefinitions = {
    brand: ['Vespa', 'Piaggio', 'Aprilia', 'Moto Guzzi', 'Athena', 'Motobatt'],
    category: ['Motor', 'Transmission', 'Electrics', 'Styling'],
    compatibility: ['GTS 300', 'Primavera', 'Sprint', 'Beverly'],
    availability: ['In stock', 'Limited', 'Pre-order'],
  };
  filterGroups: FilterKey[] = ['brand', 'category', 'compatibility', 'availability'];

  priceLimits = { min: 49, max: 1800 };
  priceRange = { min: 120, max: 1100 };

  sortOptions = [
    { label: 'Most popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'priceLow' },
    { label: 'Price: High to Low', value: 'priceHigh' },
    { label: 'Newest arrivals', value: 'newest' },
  ];

  selectedSort = this.sortOptions[0].value;
  searchTerm = '';
  viewMode: 'grid' | 'list' = 'grid';

  selectedFilters: SelectedFilters = {
    brand: [],
    category: [],
    compatibility: [],
    availability: [],
  };

  private productSeed: CatalogProduct[] = [
    {
      id: 'p-1',
      name: 'NGK B6HS Spark Plug',
      brand: 'Vespa',
      category: 'Motor',
      subcategoryLabel: 'Air filters',
      categoryId: 'motor',
      subcategoryId: 'filter-air',
      compatibility: ['Primavera', 'Sprint'],
      price: 79,
      availability: 'In stock',
      rating: 4.7,
      reviews: 132,
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      badge: 'Top Seller',
    },
    {
      id: 'p-2',
      name: 'Aprilia Sport Exhaust',
      brand: 'Aprilia',
      category: 'Motor',
      subcategoryLabel: 'Exhaust pipes',
      categoryId: 'motor',
      subcategoryId: 'exhaust-pipes',
      compatibility: ['Beverly'],
      price: 499,
      availability: 'Limited',
      rating: 4.8,
      reviews: 22,
      image:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80',
      badge: 'New',
    },
    {
      id: 'p-3',
      name: 'Performance Variator Kit',
      brand: 'Aprilia',
      category: 'Motor',
      subcategoryLabel: 'Intake manifolds',
      categoryId: 'motor',
      subcategoryId: 'intake-manifolds',
      compatibility: ['Sprint', 'GTS 300'],
      price: 319,
      availability: 'In stock',
      rating: 4.7,
      reviews: 41,
      image:
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p-4',
      name: 'Piaggio OEM Brake Kit',
      brand: 'Piaggio',
      category: 'Transmission',
      subcategoryLabel: 'Chains',
      categoryId: 'transmission',
      subcategoryId: 'chains',
      compatibility: ['GTS 300', 'Beverly'],
      price: 229,
      availability: 'In stock',
      rating: 4.6,
      reviews: 61,
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p-5',
      name: 'Clutch Pack Athena',
      brand: 'Athena',
      category: 'Transmission',
      subcategoryLabel: 'Clutches',
      categoryId: 'transmission',
      subcategoryId: 'clutches',
      compatibility: ['GTS 300', 'Primavera'],
      price: 312,
      availability: 'Limited',
      rating: 4.5,
      reviews: 34,
      image:
        'https://images.unsplash.com/photo-1582967788606-a0dbc9c88089?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p-6',
      name: 'LED Lighting Bundle',
      brand: 'Piaggio',
      category: 'Electrics',
      subcategoryLabel: 'Lighting',
      categoryId: 'electrics',
      subcategoryId: 'lighting',
      compatibility: ['GTS 300', 'Primavera'],
      price: 189,
      availability: 'Limited',
      rating: 4.3,
      reviews: 54,
      image:
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p-7',
      name: 'Lithium Battery Kit',
      brand: 'Motobatt',
      category: 'Electrics',
      subcategoryLabel: 'Batteries',
      categoryId: 'electrics',
      subcategoryId: 'batteries',
      compatibility: ['Primavera', 'Sprint'],
      price: 259,
      availability: 'In stock',
      rating: 4.4,
      reviews: 28,
      image:
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p-8',
      name: 'Touring Windshield Kit',
      brand: 'Vespa',
      category: 'Styling',
      subcategoryLabel: 'Windscreens',
      categoryId: 'styling',
      subcategoryId: 'windscreens',
      compatibility: ['Primavera', 'Sprint'],
      price: 279,
      availability: 'Pre-order',
      rating: 4.5,
      reviews: 34,
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    },
  ];

  get products(): CatalogProduct[] {
    let list = [...this.productSeed];

    if (this.searchTerm.trim()) {
      const query = this.searchTerm.trim().toLowerCase();
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.subcategoryLabel.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    list = list.filter((product) => product.price >= this.priceRange.min && product.price <= this.priceRange.max);
    list = list.filter((product) => product.categoryId === this.selectedCategoryId);

    if (this.selectedSubcategoryId) {
      list = list.filter((product) => product.subcategoryId === this.selectedSubcategoryId);
    }

    (Object.keys(this.selectedFilters) as FilterKey[]).forEach((key) => {
      const values = this.selectedFilters[key];
      if (!values.length) {
        return;
      }

      list = list.filter((product) => {
        switch (key) {
          case 'brand':
          case 'category':
            return values.includes(product[key]);
          case 'compatibility':
            return product.compatibility.some((item) => values.includes(item));
          case 'availability':
            return values.includes(product.availability);
        }
      });
    });

    switch (this.selectedSort) {
      case 'priceLow':
        return list.sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return list.sort((a, b) => b.price - a.price);
      case 'newest':
        return list.sort((a, b) => b.id.localeCompare(a.id));
      default:
        return list;
    }
  }

  toggleFilter(group: FilterKey, value: string): void {
    const bucket = this.selectedFilters[group];
    const index = bucket.indexOf(value);
    if (index >= 0) {
      bucket.splice(index, 1);
    } else {
      bucket.push(value);
    }
  }

  isSelected(group: FilterKey, value: string): boolean {
    return this.selectedFilters[group].includes(value);
  }

  appliedFilters(): Array<{ label: string; group: FilterKey }> {
    const chips: Array<{ label: string; group: FilterKey }> = [];
    (Object.keys(this.selectedFilters) as FilterKey[]).forEach((key) => {
      this.selectedFilters[key].forEach((value) => chips.push({ label: value, group: key }));
    });
    return chips;
  }

  removeFilter(group: FilterKey, value: string): void {
    this.selectedFilters[group] = this.selectedFilters[group].filter((item) => item !== value);
  }

  clearAllFilters(): void {
    (Object.keys(this.selectedFilters) as FilterKey[]).forEach((key) => (this.selectedFilters[key] = []));
    this.priceRange = { ...this.priceLimits };
    this.searchTerm = '';
    this.selectedSubcategoryId = null;
  }

  updatePriceRange(type: 'min' | 'max', event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (type === 'min') {
      this.priceRange.min = Math.min(value, this.priceRange.max - 10);
    } else {
      this.priceRange.max = Math.max(value, this.priceRange.min + 10);
    }
  }

  selectCategory(categoryId: string): void {
    if (this.selectedCategoryId === categoryId) {
      return;
    }
    this.selectedCategoryId = categoryId;
    this.clearSubcategorySelection();
    this.selectedSectionId = null;
    this.expandedItems.clear();
    const firstSection = this.activeSections[0];
    if (firstSection) {
      this.selectedSectionId = firstSection.id;
    }
  }

  selectSubcategory(subcategoryId: string, label?: string): void {
    const nextId = this.selectedSubcategoryId === subcategoryId ? null : subcategoryId;
    this.selectedSubcategoryId = nextId;
    this.selectedItemLabel = nextId ? label ?? null : null;
  }

  toggleItem(itemId: string): void {
    if (this.expandedItems.has(itemId)) {
      this.expandedItems.delete(itemId);
    } else {
      this.expandedItems.add(itemId);
    }
  }

  isItemExpanded(itemId: string): boolean {
    return this.expandedItems.has(itemId);
  }

  selectSection(sectionId: string): void {
    if (this.selectedSectionId === sectionId) {
      return;
    }
    this.selectedSectionId = sectionId;
    this.expandedItems.clear();
    this.clearSubcategorySelection();
  }

  private flattenSections(sections: CatalogSubcategorySection[]): CatalogSubcategory[] {
    const flattened: CatalogSubcategory[] = [];
    sections.forEach((section) => {
      section.items.forEach((item) => {
        flattened.push({ id: item.id, label: item.label });
        item.children?.forEach((child) => flattened.push({ id: child.id, label: child.label }));
      });
    });
    return flattened;
  }

  get activeCategory(): CatalogCategory | undefined {
    return this.categories.find((category) => category.id === this.selectedCategoryId);
  }

  get activeSubcategories(): CatalogSubcategory[] {
    return this.activeCategory?.subcategories ?? [];
  }

  get activeSections(): CatalogSubcategorySection[] {
    return this.activeCategory?.sections ?? [];
  }

  get selectedSection(): CatalogSubcategorySection | undefined {
    const resolvedId = this.resolvedSectionId;
    if (!resolvedId) {
      return undefined;
    }
    return this.activeSections.find((section) => section.id === resolvedId);
  }

  get selectableSubcategories(): CatalogSubcategory[] {
    if (this.activeSections.length) {
      return this.flattenSections(this.activeSections);
    }
    return this.activeSubcategories;
  }

  get filterSubcategories(): CatalogSubcategory[] {
    return this.selectableSubcategories;
  }

  clearSubcategorySelection(): void {
    this.selectedSubcategoryId = null;
    this.selectedItemLabel = null;
  }

  isSectionSelected(sectionId: string): boolean {
    return this.resolvedSectionId === sectionId;
  }

  private get resolvedSectionId(): string | null {
    if (this.selectedSectionId) {
      return this.selectedSectionId;
    }
    return this.activeSections[0]?.id ?? null;
  }

  switchView(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
}
