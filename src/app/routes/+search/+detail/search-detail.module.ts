import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { SearchDetailRouterModule } from './search-detail-router.module';
import { RouterModule } from '@angular/router';
import { SearchDetailComponent } from './search-detail.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    SearchDetailRouterModule
  ],
  exports: [SearchDetailRouterModule],
  declarations: [SearchDetailComponent]
})

export class SearchDetailModule { }
