import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDirectorBancoComponent } from './header-director-banco.component';

describe('HeaderDirectorBancoComponent', () => {
  let component: HeaderDirectorBancoComponent;
  let fixture: ComponentFixture<HeaderDirectorBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDirectorBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDirectorBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
