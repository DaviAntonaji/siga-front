import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('id', username);
      urlSearchParams.set('password', password);

      // Set the content type to 'application/x-www-form-urlencoded'

      this.authService
        .signIn(urlSearchParams.toString())
        .subscribe((response) => {
          const uid = response.session_id;
          console.log(uid)
          this.authService.verifyIfSessionIsValid(uid).subscribe((res) => {
            console.log(res);
            if (res.error) {
              alert('Login e/ou senha incorretos!');
            } else {
              localStorage.setItem('uid', uid);
              this.router.navigate(["/home"])

            }
          });
        });
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };
}
