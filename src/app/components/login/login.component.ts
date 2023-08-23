import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: any;
  selectedOption: any = 'cpf';
  mask = '000.000.000-00';
  loading:any = false;

  onRadioChange(event: any) {
    this.selectedOption = event.value;
    console.log(event.value);
    this.updateMask();
  }

  updateMask() {
    if (this.selectedOption === 'cpf') {
      this.mask = '000.000.000-00';
    } else if (this.selectedOption === 'rg') {
      this.mask = '00.000.000-0-LL'; // Substitua LL pela máscara específica do estado
    } else if (this.selectedOption === 'ra') {
      this.mask = '9999999999999';
    }
    console.log(this.mask);
  }

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
      urlSearchParams.set('id', username.replace('.', '').replace('-', '').toUpperCase());
      urlSearchParams.set('password', password);

      // Set the content type to 'application/x-www-form-urlencoded'
     this.loading = true;
      this.authService
        .signIn(urlSearchParams.toString())
        .subscribe((response) => {
          const uid = response.session_id;
          
          this.authService.verifyIfSessionIsValid(uid).subscribe((res) => {
            this.loading = false;
            if (res.error) {
              Swal.fire({
                heightAuto: false,
                title: 'Ooops.',
                text: 'Login e/ou Senha incorretos',
                icon: 'error',
                iconColor: '#243645',
                showCancelButton: false,
                confirmButtonColor: '#243645',
                confirmButtonText: 'OK',
              });
            } else {
              localStorage.setItem('uid', uid);
              this.router.navigate(['/home']);
            }
          });
        });
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };
}
