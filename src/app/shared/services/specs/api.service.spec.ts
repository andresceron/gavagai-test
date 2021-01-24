import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '../api.service';

describe( 'ApiService: ', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        HttpClient
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
      expect( service ).toBeTruthy();
  });

  it('should call get() and return an Observable<T>', () => {
    const dummyData = { data: 1 };

    service.get('stringUrl').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:4200/api/stringUrl');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);

    httpMock.verify();
  });

  it('should call get() with params and call convertJSONtoParams', () => {
    const dummyData = { data: 1 };

    service.get('stringUrl', { param1: 'value1'}).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:4200/api/stringUrl?param1=value1');
    req.flush(dummyData);

    httpMock.verify();
  });

  it('should call get() and return correct headers', () => {
    const dummyData = { data: 1 };

    service.get('stringUrl', { param1: ''}).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:4200/api/stringUrl');

    expect(req.request.headers.get('content-type')).toEqual('application/json');
    expect(req.request.headers.get('accept')).toEqual('application/json;charset=UTF-8');

    req.flush(dummyData);

    httpMock.verify();
  });

  it('should call get() and return correct custom headers', () => {
    const dummyData = { data: 1 };

    let customHeaders: HttpHeaders = new HttpHeaders();
    customHeaders = customHeaders.set( 'custom', 'data' );

    service.get('stringUrl', { param1: ''}, customHeaders).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:4200/api/stringUrl');

    expect(req.request.headers.get('custom')).toEqual('data');

    req.flush(dummyData);

    httpMock.verify();
  });

  it('should call get() with no responseType to set to json', () => {
    const dummyData = { data: 1 };

    service.get('stringUrl', null, null, null).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:4200/api/stringUrl');

    req.flush(dummyData);

    httpMock.verify();
  });

} );
