import { Component } from '@angular/core';

@Component({
  selector: 'app-home-main',
  standalone: false,
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent {

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
  
}
