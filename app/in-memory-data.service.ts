import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let projectMetrics = [
      {id: '1', name: 'Métrica 1'},
      {id: '2', name: 'Métrica 2'}
    ];
    return { projectMetrics };
  }
}
