import { Component } from '@angular/core';
import { NotasModel } from 'src/app/models/NotasModel';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent {
  carregando: boolean = true;
  notas: NotasModel[] = [];

  constructor(private alunoService: AlunoService) {
    this.alunoService.getNotas().subscribe((data) => {
      this.notas = data;
      console.log(this.notas);
      this.carregando = false;
    });
  }
  formatarData(data: string): string {
    if(data === '0000-00-00' || data === '0000-00-00T00:00:00') {
        return "Ainda não há data programada para essa prova."
    }
    const dataProva = new Date(data);
    const hoje = new Date();
    const diferencaEmDias = Math.ceil(
      (dataProva.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diferencaEmDias < 7) {
      return `${dataProva.toLocaleDateString('pt-BR')} (destaque)`;
    }

    return dataProva.toLocaleDateString('pt-BR');
  }
  isProvaDestaque(data: string): boolean {
    const dataProva = new Date(data);
    const hoje = new Date();
    const diferencaEmDias = Math.ceil(
      (dataProva.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diferencaEmDias < 7;
  }
}
