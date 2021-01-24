import { NgModule } from '@angular/core';

import { ContactRouterModule } from './contact-router.module';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    RouterModule,
    ContactRouterModule
  ],
  exports: [ContactRouterModule],
  declarations: [ContactComponent]
})

export class ContactModule { }
