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
  private margin = 50;
  private width = 700;
  private height = 600;
  private x: any;
  private y: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;;
  private colors;
  private svg: any;

  constructor(private skillsService: SkillService) {
  }

  ngOnInit(): void {
    this.createSVG();
    this.createColors();
    this.drawPie();
    this.skillsService.skills$.subscribe((skills: Skills[]) => {
      this.updateChart(skills);
    });
  }

  get skills() {
    return this.skillsService.skills;
  }

  createSVG(): void {
    this.svg = d3.select("figure#pie").append("svg")
      .attr(
        'viewBox', //// viewbox is for responsive width height
        `0 0 ${this.width + this.margin + this.margin} ${this.height + this.margin + this.margin
        }`
      )
      /* .attr("width", this.width).attr("height", this.height) */
      .append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  }

  drawPie(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.score));

    this.svg.selectAll('pieces').data(pie(this.skills)).enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

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
      .attr('font-family', 'Poppins, sans-serif')
      .style("font-size", 15);
  }

  createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.skills.map(d => d.score.toString()))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  updateChart(skills: Skills[]): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.score));
    const pieData = pie(skills);
    const paths = this.svg.selectAll('path').data(pieData);

    paths.exit().remove();

    paths.attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    );

    paths.enter().append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Update labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    const labels = this.svg.selectAll('text').data(pieData);

    // Remove exiting labels
    labels.exit().remove();

    // Update existing labels
    labels.attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")");

    // Add new labels
    labels.enter().append('text')
      .text((d: any) => d.data.name)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }
}
