import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioConvService {

  url: String = `http://localhost:3000`;

  constructor(private httpClient: HttpClient) { }

  convertAudio() {

    // console.log(audioFile);
    // console.log(JSON.stringify(audioFile));

    // let file = {
    //   path: audioFile
    // }

    this.httpClient.get(`${this.url}/audioConv`)
      .subscribe(res => {
        if (res) {
          console.log(res);
        }
        else {

        }
      });

  }

}
