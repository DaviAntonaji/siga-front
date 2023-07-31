export interface HorarioModel {
    segunda: Horario[];
    terca: Horario[];
    quarta: Horario[];
    quinta: Horario[];
    sexta: Horario[];
    sabado: Horario[];
  }
  
  export interface Horario {
    AULA: number;
    DISCIPLINA: string;
    HORARIO: string;
    TURMA: string;
  }