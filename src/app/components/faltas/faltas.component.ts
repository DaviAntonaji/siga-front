import { Component } from '@angular/core';
import { FaltaModel } from 'src/app/models/FaltaModel';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-faltas',
  templateUrl: './faltas.component.html',
  styleUrls: ['./faltas.component.scss'],
})
export class FaltasComponent {
  faltas: FaltaModel[] = [];
  displayedColumns: string[] = [ 'DESCRICAO', 'AULAS', 'FALTAS', 'TOTAL'];
  faltasTable: any;
  carregando: boolean = true;

  constructor(private alunoService: AlunoService) {
    this.alunoService.getFaltas().subscribe((data) => {
      this.faltas = data;
      this.faltasTable = this.faltas;
      this.carregando = false;
    });
  }
  calculaPresenca(PRESENCAS: any, TOTAL: any) {
    if (TOTAL > 0) {
      return Math.round((PRESENCAS / TOTAL) * 100);
    }
    return 100;
  }
  defineCor(frequencia: number): string {
    if (frequencia < 75) {
      return 'red'; // Vermelho
    } else if (frequencia >= 75 && frequencia < 80) {
      return 'orange'; // Laranja
    } else if (frequencia >= 80 && frequencia < 85) {
      return 'yellow'; // Amarelo
    } else {
      return 'green'; // Verde
    }
  }
}
