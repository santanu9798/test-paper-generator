import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import {TestPaperComponent} from './test-paper/test-paper.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent, title: 'Dashboard - Test Paper Generator' },
      { path: 'add-question', component: AddQuestionComponent, title: 'Add Question - Test Paper Generator' },
      { path: 'create-test', component: TestPaperComponent, title: 'Create Test Paper - Test Paper Generator' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
