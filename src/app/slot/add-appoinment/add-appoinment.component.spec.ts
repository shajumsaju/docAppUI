import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppoinmentComponent } from './add-appoinment.component';

describe('AddAppoinmentComponent', () => {
  let component: AddAppoinmentComponent;
  let fixture: ComponentFixture<AddAppoinmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppoinmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
