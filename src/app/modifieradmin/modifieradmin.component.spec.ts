import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieradminComponent } from './modifieradmin.component';

describe('ModifieradminComponent', () => {
  let component: ModifieradminComponent;
  let fixture: ComponentFixture<ModifieradminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifieradminComponent]
    });
    fixture = TestBed.createComponent(ModifieradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
