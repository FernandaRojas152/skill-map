import * as d3 from "d3";
import { Component, OnInit } from '@angular/core';
import { Skills } from '../skills';
import { SkillService } from '../skill.service';
import { ChartsConfigurationService } from "../charts-configuration.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  svg: any;
  margin= 50;
  width: number;
  height: number;
  x: any;
  y: any;
  color = d3.scaleOrdinal().domain(this.skills.map(d => d.name)).range(['pink', 'purple', 'blue', 'green', 'lightsalmon']);

  constructor(private skillsService: SkillService, private chartsConfiguration: ChartsConfigurationService) {
  }

  get skills(){
    return this.skillsService.skills;
  }

  ngOnInit() {
    this.calculateDimensions();
    this.createScales();
    this.createSVG();
    const coloredSkills = this.chartsConfiguration.generateColors(this.skillsService.skills);
    this.drawBars(coloredSkills);
    //this.chartsConfiguration.generateColors();
    /* this.drawBars(this.skillsService.skills); */
    this.skillsService.skills$.subscribe(this.updateBars);
  }

  ngOnDestroy(): void {

  }

  calculateDimensions(){
    this.width= this.chartsConfiguration.calculateDimensions(600,50,2);
    this.height= this.chartsConfiguration.calculateDimensions(600,50,2);
  }

  createScales(){
    this.x = d3.scaleBand().domain(this.skills.map(data => data.name)).range([0, this.width]).padding(0.2);
    this.y = d3.scaleLinear().domain([0, 5]).range([this.height, 0]);
  }

  createSVGSizes(size: number, margin: number, labels:number){
    return size + (margin*labels);
  }

  translation(){
    return `(${this.margin}, ${this.margin})`;
  }

  createSVG(): void {
    const width= this.createSVGSizes(this.width, this.margin, 2);
    const height= this.createSVGSizes(this.height, this.margin, 2);
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr(
        'viewBox', //// viewbox is for responsive width height
        `0 0 ${width + this.margin + this.margin} ${
          height + this.margin + this.margin
        }`
      )
/*       .attr("width", width)
      .attr("height", height) */
      .append("g")
      .attr("transform", "translate" + this.translation());
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
    this.svg.append("g").call(d3.axisLeft(this.y)).attr('font-family', 'Poppins, sans-serif').attr('font-size', '16px');
  }

  private getColor(): void {
  }

  updateBars=(newData: Skills[])=>{
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
      //.attr("fill", (d: any) => this.color(d.name));

    bars.exit().remove();
  }
}
