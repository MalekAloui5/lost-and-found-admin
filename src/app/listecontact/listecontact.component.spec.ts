import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecontactComponent } from './listecontact.component';

describe('ListecontactComponent', () => {
  let component: ListecontactComponent;
  let fixture: ComponentFixture<ListecontactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListecontactComponent]
    });
    fixture = TestBed.createComponent(ListecontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
