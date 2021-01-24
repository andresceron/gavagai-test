import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { SearchRouterModule } from './search-router.module';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    SearchRouterModule
  ],
  exports: [SearchRouterModule],
  declarations: [SearchComponent],

})

export class SearchModule { }
