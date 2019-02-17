import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-colleagues',
  templateUrl: './add-colleagues.component.html',
  styleUrls: ['./add-colleagues.component.css']
})
export class AddColleaguesComponent implements OnInit {

  colleagues:any[] = [];

  @ViewChild('fullName') inputNameRef: ElementRef;
  @ViewChild('email') inputEmailRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  addColleague() {

    let fullName = this.inputNameRef.nativeElement.value;
    let email = this.inputEmailRef.nativeElement.value;

    this.colleagues.push({
      fullName: fullName,
      email: email
    });
    // console.log(this.inputNameRef.nativeElement.value);
  }

  saveColleagues(){
    
  }

}
