import { Component } from '@angular/core';
import { DisciplinaModel } from 'src/app/models/DisciplinaModel';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent {
  disciplinas:DisciplinaModel[] = [];
  carregando:boolean = true;
  
  constructor(private alunoService: AlunoService) {
      this.alunoService.getDisciplinas().subscribe(data => {
        this.disciplinas = data;
        this.carregando = false;
      })
  }

}
