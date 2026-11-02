import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

    createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          this.toastrService.success("Login successful");
        },
        error: (errorResponse) => {
          console.log(errorResponse.error);
          this.toastrService.error("Login failed"); 
        }
      });
    }
  }

}
