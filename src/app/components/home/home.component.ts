import { Component } from '@angular/core';
import { AlunoModel } from 'src/app/models/AlunoModel';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  aluno: AlunoModel;
  carregando:boolean = true;
  constructor(private alunoService: AlunoService) {
    this.aluno = {
      CURSO: '...',
      EMAIL: '...',
      FATEC_UNIDADE: '...',
      NOME: '...',
      REGISTRO_ACADEMICO: '...',
      TURNO: '...',
      FOTO_URL: '',
      CICLO: "..."
    };

    this.alunoService.getDadosAluno().subscribe((response) => {
      this.aluno = response;
      console.log(this.aluno);
      this.carregando = false;
    });
  }
}
