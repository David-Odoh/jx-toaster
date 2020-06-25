import { TestBed } from '@angular/core/testing';

import { JxToasterService } from './jx-toaster.service';

describe('JxToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JxToasterService = TestBed.get(JxToasterService);
    expect(service).toBeTruthy();
  });
});
