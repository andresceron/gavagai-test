import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared.module';
import { FooterComponent } from '@components/footer/footer.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ]
})

export class FooterModule {}
