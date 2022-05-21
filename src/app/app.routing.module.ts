import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'person',
    loadChildren: () => import('./views/components/person/person.module').then(m => m.PersonModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./views/components/campaign/campaign.module').then(m => m.CampaignModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./views/components/vote/vote.module').then(m => m.VoteModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./views/components/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
