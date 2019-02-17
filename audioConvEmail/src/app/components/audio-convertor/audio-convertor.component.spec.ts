import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioConvertorComponent } from './audio-convertor.component';

describe('AudioConvertorComponent', () => {
  let component: AudioConvertorComponent;
  let fixture: ComponentFixture<AudioConvertorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioConvertorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
