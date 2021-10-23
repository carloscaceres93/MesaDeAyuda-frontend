import { Injectable } from '@angular/core';

export interface Item {
  url: string;
  nombre: string;
  tipo?: string;
}

export interface SubMenu {
  url: string;
  nombre: string;
  tipo?: string;
  item?: Item[];
}

export interface Menu {
  url: string;
  nombre: string;
  tipo: string;
  icono: string;
  subMenu?: SubMenu[];
}

const MENUITEMS: Menu[] = [
  {
    url: 'configuracion',
    nombre: 'Configuración',
    tipo: 'sub',
    icono: 'manage_accounts',
    subMenu: [
      {
        url: 'detalle',
        nombre: 'Detalle',
        tipo: 'subchild',
        item: [
          { url: 'buscar', nombre: 'Buscar detalle', tipo: 'link' },
          { url: 'nuevo', nombre: 'Nuevo detalle', tipo: 'link' }
        ]
      }

    ]
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
