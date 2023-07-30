import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import {catchError} from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = 'd6ae5d9bcb7e4885517c3f60cf11da66'; 
        const uid = localStorage.getItem('uid'); 

        let clonedReq = req.clone();

        if (authToken) {
            clonedReq = clonedReq.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }

        if (uid) {
            clonedReq = clonedReq.clone({
                params: clonedReq.params.set('uid', uid)
            });
        }

        return next.handle(clonedReq);
    }
}