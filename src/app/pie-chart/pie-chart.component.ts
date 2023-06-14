import * as Highcharts from 'highcharts';
import { Component, OnInit } from '@angular/core';
import { SkillService } from '../skill.service';
import { map } from 'rxjs';

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

    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
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

    this.updateChart(this.skills);

    this.skillsService.skillsForm.valueChanges
      .pipe(
        map(() => this.skills)
      ).subscribe(skills => this.updateChart(skills));
  }

  get skills() {
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