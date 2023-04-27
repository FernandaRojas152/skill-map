import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { StarRatingModule } from 'angular-star-rating';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartSectionComponent } from './chart-section/chart-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTechSkillComponent } from './skill-set/components/add-tech-skill/add-tech-skill.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SkillSetComponent,
    BarChartComponent,
    PieChartComponent,
    ChartSectionComponent,
    AddTechSkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
