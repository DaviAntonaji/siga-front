import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { SessionModel } from '../models/SessionModel';
import { AlunoModel } from '../models/AlunoModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {}

  public signIn(data: any): Observable<SessionModel> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any>(environment.api + '/session/create', data, {
      headers: headerOptions,
    });
  }
  public logOut():any {
    localStorage.clear();
    this.router.navigate(["/login"])
  }
  public verifyIfSessionIsValid(uid: any): Observable<AlunoModel> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    console.log(uid)
    return this.http.get<any>(environment.api + '/aluno/all?uid='+uid, {
      headers: headerOptions,
    });
  }


}
