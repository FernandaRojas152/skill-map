import * as Highcharts from 'highcharts';
import { Component, OnInit } from '@angular/core';
import HC_exporting from 'highcharts/modules/exporting';
import { SkillService } from '../skill.service';
import { Skills } from "../skills";
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};
  shouldUpdateChart= false;

  constructor(private skillsService: SkillService) {}

  ngOnInit() {
    HC_exporting(Highcharts);

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Skills',
      },
      xAxis: {
        categories: [],
      },
      yAxis: {
        title: {
          text: 'Value',
        },
      },
      series: [{
        name: 'Skills',
        data: [],
      }],
      exporting: {
        enabled: true,
      },
    };

    const skills = this.getSkills();
    this.updateChart(skills);

    this.skillsService.skillsForm.valueChanges
      .pipe(
        map(() => this.getSkills())
      )
      .subscribe(skills => this.updateChart(skills));
  }

  getSkills() {
    return Object.keys(this.skillsService.skillsForm.controls).map(skillName => {
      const value = this.skillsService.skillsForm.get(skillName).value;
      return { name: skillName, value: value };
    });
  }

  updateChart(skills) {
    const categories = skills.map(skill => skill.name);
    const data = skills.map(skill => skill.value);

    this.chartOptions.xAxis.categories = categories;
    this.chartOptions.series[0].data = data;
    this.shouldUpdateChart= true;
  }
}