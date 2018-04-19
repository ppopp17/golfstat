import { TestBed, inject } from '@angular/core/testing';

import { StatsServiceService } from './stats-service.service';

describe('StatsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatsServiceService]
    });
  });

  it('should be created', inject([StatsServiceService], (service: StatsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
