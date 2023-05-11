import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabnavigationComponent } from './tabnavigation.component';

describe('TabnavigationComponent', () => {
  let component: TabnavigationComponent;
  let fixture: ComponentFixture<TabnavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabnavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
