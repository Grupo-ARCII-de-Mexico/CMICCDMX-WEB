import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BolsaTrabajoPage } from './bolsa-trabajo.page';

describe('BolsaTrabajoPage', () => {
  let component: BolsaTrabajoPage;
  let fixture: ComponentFixture<BolsaTrabajoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BolsaTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
