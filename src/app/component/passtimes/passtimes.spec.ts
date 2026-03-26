import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passtimes } from './passtimes';

describe('Passtimes', () => {
  let component: Passtimes;
  let fixture: ComponentFixture<Passtimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passtimes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Passtimes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
