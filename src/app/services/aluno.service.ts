import { Injectable } from '@angular/core';
import { AlunoModel } from '../models/AlunoModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';
import { HorarioModel } from '../models/HorariosModel';
import { DisciplinaModel } from '../models/DisciplinaModel';
import { FaltaModel } from '../models/FaltaModel';
import { NotasModel } from '../models/NotasModel';
import { ProfessorModel } from '../models/ProfessorModel';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  constructor(private router: Router, private http: HttpClient) {}

  
  public getDadosAluno(): Observable<AlunoModel> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    const uid = localStorage.getItem("uid");
    return this.http.get<any>(environment.api + '/aluno/all?uid='+uid, {
      headers: headerOptions,
    });
  }
  public getHorario(): Observable<HorarioModel> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    const uid = localStorage.getItem("uid");
    return this.http.get<any>(environment.api + '/horarios/all?uid='+uid, {
      headers: headerOptions,
    });
  }
  public getDisciplinas():Observable<DisciplinaModel[]> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    const uid = localStorage.getItem("uid");
    return this.http.get<any>(environment.api + '/disciplinas/all?uid='+uid, {
      headers: headerOptions,
    });
  }
  public getFaltas():Observable<FaltaModel[]> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    const uid = localStorage.getItem("uid");
    return this.http.get<any>(environment.api + '/faltas/all?uid='+uid, {
      headers: headerOptions,
    });
  }
  public getNotas():Observable<NotasModel[]> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    const uid = localStorage.getItem("uid");
    return this.http.get<any>(environment.api + '/notas/all?uid='+uid, {
      headers: headerOptions,
    });
  }
  public getProfessores():Observable<ProfessorModel[]> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    const uid = localStorage.getItem("uid");
    return this.http.get<any>(environment.api + '/professores/all?uid='+uid, {
      headers: headerOptions,
    });
  }
}
