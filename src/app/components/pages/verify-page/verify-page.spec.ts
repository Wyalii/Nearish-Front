import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPage } from './verify-page';

describe('VerifyPage', () => {
  let component: VerifyPage;
  let fixture: ComponentFixture<VerifyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
