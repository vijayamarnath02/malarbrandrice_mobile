import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./tabs/page/dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'daily-process',
    loadComponent: () => import('./tabs/page/daily-process/daily-process.page').then(m => m.DailyProcessPage)
  },
  {
    path: 'prestreaming',
    loadComponent: () => import('./tabs/page/prestreaming/prestreaming.page').then( m => m.PrestreamingPage)
  },
  {
    path: 'streaming',
    loadComponent: () => import('./tabs/page/streaming/streaming.page').then( m => m.StreamingPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./tabs/page/admin/admin.page').then( m => m.AdminPage)
  },


];
