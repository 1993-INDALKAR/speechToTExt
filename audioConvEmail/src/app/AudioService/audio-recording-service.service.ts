import { Injectable } from '@angular/core';

import * as RecordRTC from 'recordrtc'
import { Subject, Observable } from 'rxjs';
import { AudioModule } from '../audio.module';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingServiceService {

  private stream;
  private recorder;
  private interval;
  private startTime;
  private recorded = new Subject<any>();
  private recordngTime = new Subject<string>();
  private recordingFail = new Subject<string>();


  constructor() { }

  getRecordedBlob(): Observable<AudioModule> {
    return this.recorded.asObservable();
  }

  getRecordTime(): Observable<string> {
    return this.recordngTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this.recordingFail.asObservable();
  }

  startRecording() {

    if (this.recorder) {
      return;
    }

    this.recordngTime.next('00:00');
    // console.log(this.recordngTime);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record();
    }).catch(e => {
      this.recordingFail.next();
    });

  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm'
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currTime = moment();
        const diffTime = moment.duration(currTime.diff(this.startTime));
        var minutes = diffTime.minutes().toString();
        // minutes = minutes.toString(); 
        var seconds = diffTime.seconds().toString();
        const time = `${minutes}:${seconds}`;
        this.recordngTime.next(time);
      },
      1000
    )
  }

  stopRecording() {
    // console.log(this.recorder);
    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          let currentTime = new Date().getTime();
          const mp3Name = encodeURIComponent(`audio.${currentTime}.mp3`);
          this.stopMedia();
          // console.log(blob);
         this.recorded.next({record:blob,title:mp3Name});
        //  console.log(this.recorded);
        }
      },()=>{
        this.stopMedia();
        this.recordingFail.next();
      });
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(element => {
          element.stop()
        });
        this.stream = null;
      }
    }
  }

  abortRecording(){
    this.stopMedia();
  }


}
