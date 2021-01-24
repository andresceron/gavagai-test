import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SERVICES } from '@services/providers';
import { COMPONENTS_PROVIDERS } from '@components/providers';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SERVICES,
    COMPONENTS_PROVIDERS,
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() private parentModule: CoreModule) {

    // Check if an instance of CoreModule is already created,
    // this ensures that the injectables behave properly
    if (parentModule) {
      throw new Error('CoreModule already loaded');
    }
  }
}
