import { Component } from '@angular/core';
import { Horario, HorarioModel } from 'src/app/models/HorariosModel';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent {

  carregando:boolean = true;

  horarios:any = {
    segunda:[],
    terca:[],
    quarta:[],
    quinta:[],
    sexta:[],
    sabado:[]
  }
  diasSemana: string[] = [
    'segunda',
    'terca',
    'quarta',
    'quinta',
    'sexta',
    'sabado',
  ];

  diasSemanaFormatado:any ={
    'segunda': "Segunda-Feira",
    'terca': "Terça-Feira",
    'quarta': "Quarta-Feira",
    'quinta': "Quinta-Feira",
    'sexta':"Sexta-Feira",
    'sabado':"Sábado",
  };

  obterHorariosDoDiaOrdenados(dia: string): Horario[] {
    return this.horarios[dia].sort((a:any, b:any) => {
      const [inicioA] = a.HORARIO.split('-');
      const [inicioB] = b.HORARIO.split('-');
      return inicioA.localeCompare(inicioB);
    });
  }

  constructor(private alunoService: AlunoService) {
      this.alunoService.getHorario().subscribe(data => {
        this.horarios = data;
        this.carregando = false;
      })
  }

}
