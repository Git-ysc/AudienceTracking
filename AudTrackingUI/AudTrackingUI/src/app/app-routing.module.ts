import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackingComponent } from './Root/tracking/tracking.component';
import { MonitoringComponent } from './Root/monitoring/monitoring.component';
import { UserRegistrationComponent } from './Root/user-registration/user-registration.component';

const routes: Routes = [
  {path:'',redirectTo:'Monitoring',pathMatch:'full'},
  {path:'Monitoring', component:MonitoringComponent},
  {path:'Tracking',component:TrackingComponent},
  {path:'UserRegistratoin',component:UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
