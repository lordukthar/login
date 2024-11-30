import { TestBed } from '@angular/core/testing';

import { IntervalEmitterService } from './interval-emitter.service';

describe('IntervalEmitterService', () => {
  let service: IntervalEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervalEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
