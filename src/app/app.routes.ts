import { Routes } from '@angular/router';
import { Projects } from './component/projects/projects';
import {Home} from './component/home/home';
import {AppComponent} from './app'

export const routes: Routes = [
  // { path: '', component: AppComponent},
  { path: 'projects', component: Projects },


];
