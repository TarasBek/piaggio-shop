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
      title: 'Запчастини для твого скутера — швидко, надійно, стильно',
      description:
        'Оригінальні комплектуючі та топові аксесуари з доставкою по всій Україні.',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
      ctaLabel: 'Перейти до каталогу',
    },
    {
      eyebrow: 'Готові до сезону',
      title: 'Підготуй Vespa до перших поїздок',
      description:
        'Сервісні набори, витратні матеріали та поради від наших механіків.',
      image:
        'https://images.unsplash.com/photo-1432753759888-b30b2bdac995?auto=format&fit=crop&w=1600&q=80',
      ctaLabel: 'Дізнатись більше',
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
      title: 'Колеса',
      description: 'Оригінальні диски та шини',
      image: 'https://cdn-icons-png.flaticon.com/512/3504/3504886.png',
    },
    {
      title: 'Двигун',
      description: 'Витратники та апгрейди',
      image: 'https://cdn-icons-png.flaticon.com/512/1645/1645094.png',
    },
    {
      title: 'Електрика',
      description: 'Світло, акумулятори, wiring',
      image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
    },
    {
      title: 'Масла та фільтри',
      description: 'Комплекти ТО на сезон',
      image: 'https://cdn-icons-png.flaticon.com/512/686/686589.png',
    },
    {
      title: 'Аксесуари',
      description: 'Ветрові скла, кофри, стиль',
      image: 'https://cdn-icons-png.flaticon.com/512/2944/2944127.png',
    },
    {
      title: 'Гальма',
      description: 'Колодки та диски',
      image: 'https://cdn-icons-png.flaticon.com/512/4213/4213698.png',
    },
  ];

  popularProducts = [
    {
      name: 'Переднє колесо Vespa',
      price: 1289,
      image:
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
      availability: 'В наявності',
    },
    {
      name: 'Свічка NGK B6HS',
      price: 79,
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      availability: 'В наявності',
    },
    {
      name: 'Повітряний фільтр',
      price: 349,
      image:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
      availability: 'Обмежено',
    },
    {
      name: 'Амортизатор передній',
      price: 759,
      image:
        'https://images.unsplash.com/photo-1466112928291-0903b70a20cd?auto=format&fit=crop&w=600&q=80',
      availability: 'Передзамовлення',
    },
    {
      name: 'Сервісний ремінь Drive',
      price: 299,
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      availability: 'В наявності',
    },
  ];

  benefits = [
    {
      icon: '🚚',
      title: 'Безкоштовна доставка від 100 €',
      description: 'Надійні перевізники та швидке відправлення щодня.',
    },
    {
      icon: '🛠️',
      title: 'Оригінальні запчастини',
      description: 'Працюємо напряму з дилерами Vespa, Piaggio, Aprilia.',
    },
    {
      icon: '💬',
      title: 'Підтримка клієнтів',
      description: 'Механіки допоможуть підібрати деталі під твою модель.',
    },
  ];

  blogPosts = [
    {
      title: 'Як підготувати Vespa до сезону',
      date: '12 травня 2024',
      excerpt: 'ТО-список, мастила, що варто перевірити перед першою поїздкою.',
      image:
        'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80',
      cta: 'V’юшком',
    },
    {
      title: 'Як обрати ідеальне вітрове скло',
      date: '28 квітня 2024',
      excerpt: 'Пояснюємо різницю між низькими та туринговими екранами.',
      image:
        'https://images.unsplash.com/photo-1470869784051-0b7e9e87633e?auto=format&fit=crop&w=900&q=80',
      cta: 'Читати',
    },
    {
      title: 'ТОП-5 аксесуарів для міських поїздок',
      date: '09 квітня 2024',
      excerpt: 'Ідеї для додаткового комфорту та безпеки у трафіку.',
      image:
        'https://images.unsplash.com/photo-1471440671318-55bdbb772f93?auto=format&fit=crop&w=900&q=80',
      cta: 'Читати',
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
