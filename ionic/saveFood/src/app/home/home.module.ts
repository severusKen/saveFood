import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: 'food-list',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('../food-list/food-list.module').then(m => m.FoodListPageModule)
              }
            ]
          },
          {
            path: 'stash',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('../stash/stash.module').then(m => m.StashPageModule)
              }
            ]
          },
          {
            path: 'profile',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('../profile/profile.module').then(m => m.ProfilePageModule)
              }
            ]
          },
          {
            path: '',
            redirectTo: '/home/food-list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/food-list',
        pathMatch: 'full'
      }
    ]),
  ],
declarations: [HomePage]
})
export class HomePageModule { }
