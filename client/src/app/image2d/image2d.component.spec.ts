import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Image2dComponent } from './image2d.component';

describe('Image2dComponent', () => {
  let component: Image2dComponent;
  let fixture: ComponentFixture<Image2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Image2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Image2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
