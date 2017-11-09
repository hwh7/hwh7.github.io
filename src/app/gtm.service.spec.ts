import { TestBed, inject } from '@angular/core/testing';

import { GtmService } from './gtm.service';

describe('GtmServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GtmService]
    });
  });

  it('should be created', inject([GtmService], (service: GtmService) => {
    expect(service).toBeTruthy();
  }));
});
