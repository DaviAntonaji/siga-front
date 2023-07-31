import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public selected_page = 'Home';

  pages = [
    {
      icon: 'home',
      name: 'Home',
      link: 'home',
    },
    {
      icon: 'calendar_month',
      name: 'Horarios',
      link: 'horarios',
    },
    {
      icon: 'folder_open',
      name: 'Disciplinas',
      link: 'disciplinas',
    },
    {
      icon: 'block',
      name: 'Faltas',
      link: 'faltas',
    },
    {
      icon: 'done',
      name: 'Notas',
      link: 'notas',
    },
  ];
  collapsedNav: boolean = false;

  mobileQuery: any;
  private _mobileQueryListener: any;

  public sendMessageToParent(page: any): void {
    this.selected_page = page;
  }
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
