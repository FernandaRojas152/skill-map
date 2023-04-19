import * as d3 from "d3";
import { Component, OnInit } from '@angular/core';
import { Skills } from '../skills';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private skills: Skills[] = [];
  private svg: any;
  private margin = 50;
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private color = d3.scaleOrdinal().domain(this.skills.map(d => d.name)).range(['pink', 'purple', 'blue', 'green', 'lightsalmon']);

  constructor(private skillsService: SkillService) {
  }

  ngOnInit() {
    this.calculateDimensions();
    this.getSkills();
    this.createSVG();
    this.drawBars(this.skillsService.getSkills());
    this.skillsService.skillUpdated$.subscribe((data: Skills[]) => {
      this.updateBars(data);
    });
  }

  calculateDimensions(){
    this.width= this.calculateSize(600, this.margin, 2);
    this.height= this.calculateSize(600, this.margin, 2);
  }

  calculateSize(size: number, margin: number, labels: number){
    return size - (margin * labels);
  }

  getSkills() {
    this.skills = this.skillsService.getSkills();
    this.x = d3.scaleBand().domain(this.skills.map(data => data.name)).range([0, this.width]).padding(0.2);
    this.y = d3.scaleLinear().domain([0, 5]).range([this.height, 0]);
  }

  createSVG(): void {
    const width= this.width + (this.margin * 2);
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", width)
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  drawBars(data: Skills[]): void {
    this.xAxis();
    this.yAxis();

    this.svg.selectAll("bars").data(data).enter().append("rect")
      .attr("x", (d: any) => this.x(d.name))
      .attr("y", (d: any) => this.y(d.score))
      .attr("width", this.x.bandwidth())
      .attr("height", (d: any) => this.height - this.y(d.score))
      .attr("fill", (d: any) => this.color(d.name));
  }

  xAxis(): void {
    this.svg.append("g").attr('transform', "translate(0," + this.height + ")").call(d3.axisBottom(this.x))
      .selectAll("text").attr('font-size', '20px').attr('font-family', 'Poppins, sans-serif').attr('fill', 'black');
  }

  yAxis(): void {
    this.svg.append("g").call(d3.axisLeft(this.y)).attr('font-size', '16px');
  }

  private getColor(): void {
  }

  updateBars(newData: Skills[]): void {
    this.x.domain(newData.map(data => data.name));
    this.y.domain([0, 5]);

    const bars = this.svg.selectAll("rect").data(newData);

    bars.transition().duration(1000)
      .attr("x", (d: any) => this.x(d.name))
      .attr("y", (d: any) => this.y(d.score))
      .attr("width", this.x.bandwidth())
      .attr("height", (d: any) => this.height - this.y(d.score));

    bars.enter().append("rect")
      .attr("x", (d: any) => this.x(d.name))
      .attr("y", (d: any) => this.y(d.score))
      .attr("width", this.x.bandwidth())
      .attr("height", (d: any) => this.height - this.y(d.score))
      .attr("fill", (d: any) => this.color(d.name));

    bars.exit().remove();
  }
}
