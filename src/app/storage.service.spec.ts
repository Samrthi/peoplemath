// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Team } from './team';
import { Period } from './period';
import { ObjectUpdateResponse } from './objectupdateresponse';

describe('StorageService', () => {
  let httpTestingController: HttpTestingController;
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      imports: [
        HttpClientTestingModule,
      ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(StorageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to POST a team', () => {
    const team = new Team('testteam', 'Test team');
    const response = '';
    service.addTeam(team).subscribe(data => expect(data).toEqual(response));

    const req = httpTestingController.expectOne('/api/team/');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(team);

    req.flush(response);
  });

  it('should be able to PUT a team', () => {
    const team = new Team('testteam', 'Test team');
    const response = '';
    service.updateTeam(team).subscribe(data => expect(data).toEqual(response));

    const req = httpTestingController.expectOne('/api/team/testteam');

    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(team);

    req.flush(response);
  });

  it('should be able to GET a team', () => {
    const team = new Team('testteam', 'Test team');
    service.getTeam('testteam').subscribe(data => expect(data).toEqual(team));

    const req = httpTestingController.expectOne('/api/team/testteam');

    expect(req.request.method).toEqual('GET');

    req.flush(team);
  });

  it('should be able to GET all teams', () => {
    const teams = [new Team('team1', 'Team 1'), new Team('team2', 'Team 2')];
    service.getTeams().subscribe(data => expect(data).toEqual(teams));

    const req = httpTestingController.expectOne('/api/team/');

    expect(req.request.method).toEqual('GET');

    req.flush(teams);
  });

  it('should be able to POST a period', () => {
    const period = new Period('testperiod', 'Test period', 'units', '', 50, [], [], '');
    const response: ObjectUpdateResponse = {lastUpdateUUID: 'newuuid'};
    service.addPeriod('testteam', period).subscribe(data => expect(data).toEqual(response));

    const req = httpTestingController.expectOne('/api/period/testteam/');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(period);

    req.flush(response);
  });

  it('should be able to PUT a period', () => {
    const period = new Period('testperiod', 'Test period', 'units', '', 50, [], [], '');
    const response: ObjectUpdateResponse = {lastUpdateUUID: 'newuuid'};
    service.updatePeriod('testteam', period).subscribe(data => expect(data).toEqual(response));

    const req = httpTestingController.expectOne('/api/period/testteam/testperiod');

    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(period);

    req.flush(response);
  });

  it('should be able to GET a period', () => {
    const period = new Period('testperiod', 'Test period', 'units', '', 50, [], [], '');
    service.getPeriod('testteam', 'testperiod').subscribe(data => expect(data).toEqual(period));

    const req = httpTestingController.expectOne('/api/period/testteam/testperiod');

    expect(req.request.method).toEqual('GET');
    
    req.flush(period);
  });

  it('should be able to GET all periods for a team', () => {
    const periods = [
      new Period('p1', 'Pd 1', 'units', '', 50, [], [], ''),
      new Period('p2', 'Pd 2', 'units', '', 50, [], [], ''),
    ];
    service.getPeriods('testteam').subscribe(data => expect(data).toEqual(periods));

    const req = httpTestingController.expectOne('/api/period/testteam/');

    expect(req.request.method).toEqual('GET');

    req.flush(periods);
  });
});
