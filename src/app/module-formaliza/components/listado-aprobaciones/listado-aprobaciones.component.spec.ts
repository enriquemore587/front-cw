import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAprobacionesComponent } from './listado-aprobaciones.component';

describe('ListadoAprobacionesComponent', () => {
  let component: ListadoAprobacionesComponent;
  let fixture: ComponentFixture<ListadoAprobacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoAprobacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAprobacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
