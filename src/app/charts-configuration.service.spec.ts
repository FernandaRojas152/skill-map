import { TestBed } from '@angular/core/testing';

import { ChartsConfigurationService } from './charts-configuration.service';

describe('ChartsConfigurationService', () => {
  let service: ChartsConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
