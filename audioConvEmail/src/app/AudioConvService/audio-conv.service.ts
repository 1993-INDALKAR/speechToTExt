import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioConvService {

  url: String = `http://localhost:3000`;

  constructor(private httpClient: HttpClient) { }

  convertAudio(audioFile) {

    // console.log(audioFile);
    // console.log(JSON.stringify(audioFile));

    let file = {
      path: audioFile
    }

    this.httpClient.post(`${this.url}/audioConv`, file)
      .subscribe(res => {
        if (res) {
          console.log(res);
        }
        else {

        }
      });

  }

}
