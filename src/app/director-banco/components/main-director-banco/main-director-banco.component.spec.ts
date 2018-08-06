import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDirectorBancoComponent } from './main-director-banco.component';

describe('MainDirectorBancoComponent', () => {
  let component: MainDirectorBancoComponent;
  let fixture: ComponentFixture<MainDirectorBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDirectorBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDirectorBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
