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
  disciplinas:any = {

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
        this.alunoService.getProfessores().subscribe((responseProfessores) => {
          responseProfessores.forEach(e => {
            this.disciplinas[e.ID] = {
              nomeDisciplina: e.DESCRICAO,
              nomeProfessor: e.NOME
            }
          })
          console.log(this.disciplinas)
          this.carregando = false;
        })
      })
  } 
  getDiaSemanaAtual(): string {
    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const hoje = new Date();
    const diaAtual = hoje.getDay(); // Isso retorna um número de 0 (domingo) a 6 (sábado)
    const diaDaSemanaAtual = diasSemana[diaAtual];
    return diaDaSemanaAtual;
  }

}
