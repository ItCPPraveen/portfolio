import { TestBed } from '@angular/core/testing';

import { PropertySharingService } from './property-sharing.service';

describe('PropertySharingService', () => {
  let service: PropertySharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertySharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
