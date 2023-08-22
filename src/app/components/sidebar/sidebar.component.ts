import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public selected_page = 'Home';
  @ViewChild('snav') sidenav!: MatDrawer;

  aluno = {
    CURSO: '...',
    EMAIL: '...',
    FATEC_UNIDADE: '...',
    NOME: '...',
    REGISTRO_ACADEMICO: '...',
    TURNO: '...',
    FOTO_URL: '',
    CICLO: "..."
  };


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
    if (this.mobileQuery.matches) {
      this.sidenav.toggle();
    }
  }
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, alunoService: AlunoService, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    alunoService.getDadosAluno().subscribe((response:any) => {
      this.aluno = response;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
  onActivate(event: any) {
    this.scrollToTop();
  }
  scrollToTop() {
    console.log('Starting scroll...');
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);

        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  logOut() {
    this.authService.logOut();
  }
}
