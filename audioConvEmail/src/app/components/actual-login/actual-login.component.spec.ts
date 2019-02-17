import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualLoginComponent } from './actual-login.component';

describe('ActualLoginComponent', () => {
  let component: ActualLoginComponent;
  let fixture: ComponentFixture<ActualLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
