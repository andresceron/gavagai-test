import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchDetailComponent } from './search-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SearchDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class SearchDetailRouterModule {}
