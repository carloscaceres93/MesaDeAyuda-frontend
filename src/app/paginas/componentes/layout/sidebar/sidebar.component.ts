import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu, MenuItems, SubMenu, Item } from 'src/app/shared/menu-items/menu-items';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>()

  private _mobileQueryListener: () => void;
  showMenu = '';

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  scrollToTop(): void {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  construirUrlSubMenu(menu: Menu, subMenu: SubMenu, item: Item): String {

    return `/${menu.url}/${subMenu.url}/${item.url}`;
  }
}
