import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartSectionComponent } from './chart-section/chart-section.component';

const routes: Routes = [
/*   {path: '', redirectTo: '/all', pathMatch: 'full'},
  {path: 'all', component: ChartSectionComponent},
  {path: 'bar', component: BarChartComponent},
  {path: 'pie', component: PieChartComponent}, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
