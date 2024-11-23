import { Routes } from '@angular/router';
import { initialDataResolver } from './core/resolvers/initial-resolver';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    title: "Manufacturas Deportivas", resolve: {
      initialData: initialDataResolver,
    },
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      
  
    ]
  },
];
