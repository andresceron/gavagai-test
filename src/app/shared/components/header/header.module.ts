import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared.module';
import { HeaderComponent } from '@components/header/header.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})

export class HeaderModule {}
