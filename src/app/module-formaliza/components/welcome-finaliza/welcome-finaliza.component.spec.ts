import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeFinalizaComponent } from './welcome-finaliza.component';

describe('WelcomeFinalizaComponent', () => {
  let component: WelcomeFinalizaComponent;
  let fixture: ComponentFixture<WelcomeFinalizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeFinalizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeFinalizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
