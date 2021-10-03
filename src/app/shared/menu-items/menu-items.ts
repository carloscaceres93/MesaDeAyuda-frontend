import { Injectable } from '@angular/core';

export interface SubMenu {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  subMenu?: SubMenu[];
}

const MENUITEMS = [
  {
    state: 'dispositivo',
    name: 'Dispositivos',
    type: 'sub',
    icon: 'devices',
    subMenu: [
      { state: 'servicio', name: 'Servicios', type: 'link' },
      { state: 'prueba1', name: 'prueba1', type: 'link' },
      { state: 'prueba2', name: 'prueba2', type: 'link' },
      { state: 'prueba3', name: 'prueba3', type: 'link' },
    ]
  },
  {
    state: 'configuracion',
    name: 'Configuración',
    type: 'sub',
    icon: 'manage_accounts',
    subMenu: [
      { state: 'inicio', name: 'Inicio', type: 'link' },
    ]
  },
  {
    state: 'bodega',
    name: 'Bodega',
    type: 'sub',
    icon: 'apps',
  }

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
