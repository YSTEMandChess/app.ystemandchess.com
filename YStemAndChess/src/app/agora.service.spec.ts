import { TestBed } from '@angular/core/testing';

import { AgoraService } from './agora.service';

describe('AgoraService', () => {
  let service: AgoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
