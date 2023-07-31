export interface NotasModel {
    ID: string;
    DESCRICAO: string;
    MEDIA: number;
    PROVAS: PROVA[];
  }
  
  export interface PROVA {
    ID: string;
    DATA: string;
    AVALIACAO: AVALIACAO[];
  }
  
  export interface AVALIACAO {
    ACD_PlanoEnsinoAvaliacaoParcialNota: number;
    ACD_PlanoEnsinoAvaliacaoParcialDataLancamento: string;
  }
  
 