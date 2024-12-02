import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtPresentsComponent } from './bought-presents.component';

describe('BoughtPresentsComponent', () => {
  let component: BoughtPresentsComponent;
  let fixture: ComponentFixture<BoughtPresentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoughtPresentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoughtPresentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
