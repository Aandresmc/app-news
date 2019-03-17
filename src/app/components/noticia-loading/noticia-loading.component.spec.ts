import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaLoadingComponent } from './noticia-loading.component';

describe('NoticiaLoadingComponent', () => {
  let component: NoticiaLoadingComponent;
  let fixture: ComponentFixture<NoticiaLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiaLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
