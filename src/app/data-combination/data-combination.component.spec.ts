import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCombinationComponent } from './data-combination.component';

describe('DataCombinationComponent', () => {
  let component: DataCombinationComponent;
  let fixture: ComponentFixture<DataCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCombinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
