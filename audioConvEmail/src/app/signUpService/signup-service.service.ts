import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  url: String = `http://localhost:3000`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  async signup(details) {
    // console.log(details);
    // console.log(`${this.url}/signup`);
    return await this.httpClient.post(`${this.url}/signup`, details)
      .subscribe(res => {

        if (res.hasOwnProperty("message")) {
          this.router.navigateByUrl("");
        }
        else {
          console.log(res);
          // this.router.navigateByUrl("/login");
          this.router.navigate(['/login'], { queryParams: { createdUser: true } });
        }
      }
      );
  }

  async login(loginDetails) {
    this.httpClient.post(`${this.url}/login`, loginDetails)
      .subscribe(res => {
        if (!res.hasOwnProperty("message")) {
          if (res["colleagues"] == true)
            this.router.navigateByUrl("/audioConv");
          else
            this.router.navigateByUrl("/addColleagues");
        }
        else {
          
        }
      })
  }


}
