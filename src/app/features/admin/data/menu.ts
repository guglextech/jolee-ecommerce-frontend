import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/core/models/menu';

export const menuItems: Menu[] = [
  {
    main_title: 'General',
  },
  {
    title: 'Dashboards',
    id: 'dashboards',
    icon: 'home',
    type: 'sub',
    active: true,
    level: 1,
    badge: true,
    badge_value: '13',
    badge_color: 'primary',
    children: [
      { path: '/dashboard/home', title: 'Ecommerce', type: 'link' },
      { path: '/dashboard/create', title: 'Add Product', type: 'link' },
      {
        path: '/dashboard/category',
        title: 'Category',
        id: 'category',
        type: 'link',
      },
    ],
  },

  {
    path: '/faq',
    id: 'faq',
    title: 'FAQ',
    icon: 'faq',
    type: 'link',
    active: false,
    level: 1,
  },
];

// Array
export const items = new BehaviorSubject<Menu[]>(menuItems);
