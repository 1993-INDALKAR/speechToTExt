import { TestBed } from '@angular/core/testing';

import { AudioConvService } from './audio-conv.service';

describe('AudioConvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioConvService = TestBed.get(AudioConvService);
    expect(service).toBeTruthy();
  });
});
