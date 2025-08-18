import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tab/tab.page').then(m => m.TabPage),
    children: [
      {
        path: 'setting',
        loadComponent: () => import('./tabs/pages/setting/setting.page').then(m => m.SettingPage)
      },
      {
        path: 'daily-process',
        loadComponent: () => import('./tabs/pages/daily-process/daily-process.page').then(m => m.DailyProcessPage),
      },
      {
        path: 'prestreaming',
        loadComponent: () => import('./tabs/pages/prestreaming/prestreaming.page').then(m => m.PrestreamingPage)
      },
      {
        path: 'streaming',
        loadComponent: () => import('./tabs/pages/streaming/streaming.page').then(m => m.StreamingPage)
      },
      {
        path: 'admin',
        loadComponent: () => import('./tabs/pages/admin/admin.page').then(m => m.AdminPage)
      }, {
        path: 'dashboard',
        loadComponent: () => import('./tabs/pages/dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'userlist',
        loadComponent: () => import('./tabs/pages/userlist/userlist.page').then(m => m.UserlistPage)
      },
      {
        path: 'daily-process/create',
        loadComponent: () => import('./tabs/components/newdailyprocess/newdailyprocess.page').then(m => m.NewdailyprocessPage)
      },
      {
        path: 'daily-process/edit/:id',
        loadComponent: () => import('./tabs/components/newdailyprocess/newdailyprocess.page').then(m => m.NewdailyprocessPage)
      },
      {
        path: 'prestreaming/create',
        loadComponent: () => import('./tabs/components/newprestreaming/newprestreaming.page').then(m => m.NewPrestreamingPage)
      },
      {
        path: 'prestreaming/edit/:id',
        loadComponent: () => import('./tabs/components/newprestreaming/newprestreaming.page').then(m => m.NewPrestreamingPage)
      },
      {
        path: 'streaming/create',
        loadComponent: () => import('./tabs/components/newstreaming/newstreaming.page').then(m => m.NewStreamingPage)
      },
      {
        path: 'streaming/edit/:id',
        loadComponent: () => import('./tabs/components/newstreaming/newstreaming.page').then(m => m.NewStreamingPage)
      },
      {
        path: 'userlist/create',
        loadComponent: () => import('./tabs/components/newuser/newuser.page').then(m => m.NewuserPage)
      },
      {
        path: 'userlist/edit/:id',
        loadComponent: () => import('./tabs/components/newuser/newuser.page').then(m => m.NewuserPage)
      },
      {
        path: 'stockinward',
        loadComponent: () => import('./tabs/components/stockinward/stockinward.page').then(m => m.StockinwardPage)
      },
      {
        path: 'samplepage',
        loadComponent: () => import('./tabs/components/samplepage/samplepage.page').then(m => m.SamplepagePage)
      },
      {
        path: 'stockoutward',
        loadComponent: () => import('./tabs/components/stockoutward/stockoutward.page').then(m => m.StockoutwardPage)
      },



    ]
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


];
