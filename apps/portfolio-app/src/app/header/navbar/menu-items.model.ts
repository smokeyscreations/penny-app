import { MenuItem } from 'primeng/api';

export const initialMenuItems: MenuItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    routerLink: ['/']
  },
  {
    label: 'About',
    icon: 'pi pi-fw pi-info',
    routerLink: ['/about']
  },
];
