import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: ':wordId',
    component: SearchComponent
  },
  {
    path: ':wordId/detail',
    loadChildren: () => import('./+detail/search-detail.module').then(m => m.SearchDetailModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class SearchRouterModule {}
