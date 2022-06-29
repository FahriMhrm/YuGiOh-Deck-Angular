import { TestBed } from '@angular/core/testing';

import { YugiohApiService } from './yugioh-api.service';

describe('YugiohApiService', () => {
  let service: YugiohApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YugiohApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
