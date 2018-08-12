import { TestBed, inject } from '@angular/core/testing';

import { CartsharedService } from './cartshared.service';

describe('CartsharedserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartsharedService]
    });
  });

  it('should be created', inject([CartsharedService], (service: CartsharedService) => {
    expect(service).toBeTruthy();
  }));
});
