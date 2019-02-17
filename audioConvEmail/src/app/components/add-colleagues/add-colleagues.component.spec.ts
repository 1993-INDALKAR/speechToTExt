import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColleaguesComponent } from './add-colleagues.component';

describe('AddColleaguesComponent', () => {
  let component: AddColleaguesComponent;
  let fixture: ComponentFixture<AddColleaguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColleaguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColleaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
