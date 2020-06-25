import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JxToasterComponent } from './jx-toaster.component';

describe('JxToasterComponent', () => {
  let component: JxToasterComponent;
  let fixture: ComponentFixture<JxToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JxToasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JxToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
