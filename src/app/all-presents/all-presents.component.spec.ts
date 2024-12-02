import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPresentsComponent } from './all-presents.component';

describe('AllPresentsComponent', () => {
  let component: AllPresentsComponent;
  let fixture: ComponentFixture<AllPresentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPresentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPresentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
