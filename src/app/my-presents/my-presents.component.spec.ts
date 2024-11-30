import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPresentsComponent } from './my-presents.component';

describe('MyPresentsComponent', () => {
  let component: MyPresentsComponent;
  let fixture: ComponentFixture<MyPresentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPresentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPresentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
