import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEnviromentComponent } from './register-enviroment.component';

describe('RegisterEnviromentComponent', () => {
  let component: RegisterEnviromentComponent;
  let fixture: ComponentFixture<RegisterEnviromentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEnviromentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEnviromentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
