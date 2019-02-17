import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AudioConvService } from 'src/app/AudioConvService/audio-conv.service';

@Component({
  selector: 'app-add-colleagues',
  templateUrl: './add-colleagues.component.html',
  styleUrls: ['./add-colleagues.component.css']
})
export class AddColleaguesComponent implements OnInit {

  colleagues: any[] = [];

  @ViewChild('fullName') inputNameRef: ElementRef;
  @ViewChild('email') inputEmailRef: ElementRef;

  constructor(private audioconvservice: AudioConvService) { }

  ngOnInit() {
  }

  addColleague() {

    let fullName = this.inputNameRef.nativeElement.value;
    let email = this.inputEmailRef.nativeElement.value;

    this.inputNameRef.nativeElement.value = "";
    this.inputEmailRef.nativeElement.value = "";
    
    this.colleagues.push({
      fullName: fullName,
      email: email
    });
    // console.log(this.inputNameRef.nativeElement.value);
  }

  saveColleagues() {
    this.audioconvservice.saveColleagues(this.colleagues);
  }

}
