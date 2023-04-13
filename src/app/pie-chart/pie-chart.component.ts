import * as d3 from "d3";
import { Component, OnInit } from '@angular/core';
import { SkillService } from '../skill.service';
import { Skills } from "../skills";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  private skills: Skills[] = [];
  private margin = 50;
  private width = 750;
  private height = 600;
  private x: any;
  private y: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;;
  private colors;
  private svg: any;

  constructor(private skillsService: SkillService) {
  }

  ngOnInit(): void {
    this.getSkills();
    this.createSVG();
    this.createColors();
    this.drawPie();
  }

  getSkills() {
    this.skills = this.skillsService.getSkills();
  }

  createSVG(): void {
    this.svg = d3.select("figure#pie").append("svg")
      .attr("width", this.width).attr("height", this.height)
      .append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  }

  drawPie(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.score));
    // Build the pie chart
    this.svg.selectAll('pieces').data(pie(this.skills)).enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");
      
    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.skills))
      .enter()
      .append('text')
      .text((d: any) => d.data.name)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }

  createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.skills.map(d => d.score.toString()))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }
}
