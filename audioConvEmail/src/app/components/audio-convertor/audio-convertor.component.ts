import { Component, OnInit } from '@angular/core';
import { AudioRecordingServiceService } from 'src/app/AudioService/audio-recording-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioConvService } from 'src/app/AudioConvService/audio-conv.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-audio-convertor',
  templateUrl: './audio-convertor.component.html',
  styleUrls: ['./audio-convertor.component.css']
})
export class AudioConvertorComponent {

  passForm: FormGroup;
  isRecording = false;
  recordedTime;
  blobUrl;
  success;

  recordText: string = "Start Recording";

  constructor(private audioRecordingService: AudioRecordingServiceService,
    private sanitizer: DomSanitizer,
    private audioConvService: AudioConvService,
    private formBuilder: FormBuilder) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.record));
    });

  }

  startRecording() {
    this.recordText = "Recording";
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    // console.log(this.isRecording);
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
      this.recordText = "Start Recording";
      // console.log(this.blobUrl);
    }
  }

  clearRecordeDate() {
    this.blobUrl = null;
  }

  onDestroy(): void {
    this.abortRecording();
  }

  createForm() {
    this.passForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  async onConvertAudio() {

    if (this.blobUrl) {
      // this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      //   this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.record));
      // });




      // const blob = new Blob([this.blobUrl], { type: 'audio/wav' });
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.style.display = 'none';
      // a.href = url;
      // a.download = 'test.wav';
      // document.body.appendChild(a);
      // a.click();
      // setTimeout(() => {
      //   document.body.removeChild(a);
      //   // window.URL.revokeObjectURL(url);
      // }, 100);


      // const filePath = this.blobUrl.changingThisBreaksApplicationSecurity;
      // var audioFile = new Audio(filePath);
      // // console.log(audioFile);



      // console.log(this.passForm.getRawValue().password);
      console.log(this.success);
      this.success = await this.audioConvService.convertAudio();
    }
    else {

    }

  }

}
