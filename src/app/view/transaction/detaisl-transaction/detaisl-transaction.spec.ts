import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaislTransaction } from './detaisl-transaction';

describe('DetaislTransaction', () => {
  let component: DetaislTransaction;
  let fixture: ComponentFixture<DetaislTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaislTransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaislTransaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
