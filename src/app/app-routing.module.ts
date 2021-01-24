import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./routes/+search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./routes/+search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./routes/+contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
