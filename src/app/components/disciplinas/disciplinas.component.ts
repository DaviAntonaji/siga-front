import { Component } from '@angular/core';
import { DisciplinaModel } from 'src/app/models/DisciplinaModel';
import { ProfessorModel } from 'src/app/models/ProfessorModel';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent {
  disciplinas:ProfessorModel[] = [];
  carregando:boolean = true;
  professores:any = {}
  
  constructor(private alunoService: AlunoService) {
    this.alunoService.getProfessores().subscribe(data => {
          this.disciplinas = data;
          this.carregando = false;
      })
  }

}
