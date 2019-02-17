import { Component, OnInit } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupServiceService } from 'src/app/signUpService/signup-service.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-actual-login',
  templateUrl: './actual-login.component.html',
  styleUrls: ['./actual-login.component.css']
})
export class ActualLoginComponent implements OnInit {

  loginForm: FormGroup;
  createUser: boolean;

  constructor(private formBuilder: FormBuilder, 
              private loginService: SignupServiceService,
              private routes:ActivatedRoute) {

    this.createForm();

  }

  ngOnInit() {

    this.routes.queryParams.subscribe(
      (queryParams: Params) => {
        this.createUser = queryParams['createdUser'];
      }
    );

  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      // password: ['', Validators.required, Validators.minLength(8)]
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    const loginDetail = {
      userName: this.loginForm.getRawValue().userName,
      password: this.loginForm.getRawValue().password
    }
    this.loginService.login(loginDetail);
  }

}
