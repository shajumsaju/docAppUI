import { TestBed } from '@angular/core/testing';

import { CommanServiceService } from './comman-service.service';

describe('CommanServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommanServiceService = TestBed.get(CommanServiceService);
    expect(service).toBeTruthy();
  });
});
