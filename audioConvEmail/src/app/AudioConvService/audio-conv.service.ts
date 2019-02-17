import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AudioConvService {

  url: String = `http://localhost:3000`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  convertAudio() {

    // console.log(audioFile);
    // console.log(JSON.stringify(audioFile));

    // let file = {
    //   path: audioFile
    // }

    this.httpClient.get(`${this.url}/audioConv`)
      .subscribe(res => {
        if (res.hasOwnProperty("message")) {
          return true;
        }
        else {
          return false;
        }
      });

  }


  saveColleagues(colleagues: any[]) {
    // console.log(colleagues);

    this.httpClient.post(`${this.url}/saveCol`, colleagues)
      .subscribe(res => {
        if (res) {
          this.router.navigateByUrl("/audioConv");
        }
        else {

        }
      });
  }

}
