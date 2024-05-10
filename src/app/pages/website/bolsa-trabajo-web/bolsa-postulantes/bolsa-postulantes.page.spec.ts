import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BolsaPostulantesPage } from './bolsa-postulantes.page';

describe('BolsaPostulantesPage', () => {
  let component: BolsaPostulantesPage;
  let fixture: ComponentFixture<BolsaPostulantesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BolsaPostulantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
