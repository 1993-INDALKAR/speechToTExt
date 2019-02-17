import { Component, OnInit } from '@angular/core';
import { AudioRecordingServiceService } from 'src/app/AudioService/audio-recording-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioConvService } from 'src/app/AudioConvService/audio-conv.service';

@Component({
  selector: 'app-audio-convertor',
  templateUrl: './audio-convertor.component.html',
  styleUrls: ['./audio-convertor.component.css']
})
export class AudioConvertorComponent {


  isRecording = false;
  recordedTime;
  blobUrl;

  recordText: string = "Start Recording";

  constructor(private audioRecordingService: AudioRecordingServiceService,
    private sanitizer: DomSanitizer,
    private audioConvService: AudioConvService) {

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

  onConvertAudio() {

    if (this.blobUrl) {
      this.audioRecordingService.getRecordedBlob().subscribe((data) => {
        this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.record));
      });

      const filePath = this.blobUrl.changingThisBreaksApplicationSecurity;
      this.audioConvService.convertAudio(filePath);
    }
    else {

    }

  }

}
