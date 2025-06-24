import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selfProfileGuard } from './self-profile-guard';

describe('selfProfileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => selfProfileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
