import { Routes, RouterModule } from '@angular/router';

import { DataFormatterComponent } from './dataformatter/dataformatter.component';
import { BlogComponent } from './blog/blog.component'; 

const appRoutes: Routes = [
    { path: 'blog/:title', component: BlogComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'python-data-formatter', component: DataFormatterComponent },
    { path: '', redirectTo: 'blog', pathMatch: 'full' },
    { path: '**', redirectTo: 'blog' }
];

export const routes = RouterModule.forRoot(appRoutes, { enableTracing: false });
