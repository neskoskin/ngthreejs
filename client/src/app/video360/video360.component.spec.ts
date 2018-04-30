import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Video360Component } from './video360.component';

describe('Video360Component', () => {
  let component: Video360Component;
  let fixture: ComponentFixture<Video360Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Video360Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Video360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
