import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SignupServiceService } from 'src/app/signUpService/signup-service.service';
// import { ValidationService } from 'app/validation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private signupService: SignupServiceService) { }

  ngOnInit() {
  }

  saveUserForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    emailAddress: new FormControl(),
    password: new FormControl()
  });

  createForm() {
    this.saveUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)]
    });
  }

  async saveUser() {
    // console.log(this.saveUserForm.getRawValue().firstName);
    const details = this.saveUserForm.getRawValue();
    // console.log(details);
    let signup = await this.signupService.signup(details);
  }

}
