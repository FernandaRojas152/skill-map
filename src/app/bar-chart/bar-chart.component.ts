import * as d3 from "d3";
import { Component, OnInit } from '@angular/core';
import { Skills } from '../skills';
import { SkillService } from '../skill.service';
import { ChartsConfigurationService } from "../charts-configuration.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  svg: any;
  margin = 50;
  width: number;
  height: number;
  x: any;
  y: any;
  color = d3.scaleOrdinal().domain(this.skills.map(d => d.name)).range(['pink', 'purple', 'blue', 'green', 'lightsalmon']);

  constructor(private skillsService: SkillService, private chartsConfiguration: ChartsConfigurationService,
    private fb: FormBuilder) {
  }

  /* get skills(){
    return this.skillsService.skills;
  } */

  ngOnInit() {
    this.initSkillForm();
    this.calculateDimensions();
    this.createScales();
    this.createSVG();
    /*     const coloredSkills = this.chartsConfiguration.generateColors(this.skillsService.skills);
        // this.drawBars(coloredSkills);
        //this.chartsConfiguration.generateColors(); */
    this.drawBars(this.skillsService.skills);
    this.skillsService.skillsForm.valueChanges.subscribe((skills: { [key: string]: number }) => {
      const newData: Skills[] = Object.keys(skills).map(name => ({ name, score: skills[name] }));
      this.updateBars(newData);
      this.updateText(newData);
    });
  }

  ngOnDestroy(): void {

  }

  initSkillForm() {
    this.skillsService.initForm();
  }

  get skills() {
    return Object.keys(this.skillsService.skillsForm.controls).map(skillName => {
      const value = this.skillsService.skillsForm.get(skillName).value;
      return { name: skillName, value: value };
    });
  }

  calculateDimensions() {
    this.width = this.chartsConfiguration.calculateDimensions(600, 50, 2);
    this.height = this.chartsConfiguration.calculateDimensions(600, 50, 2);
  }

  createScales() {
    console.log(this.skills);
    this.x = d3.scaleBand().domain(this.skills.map(data => data.name)).range([0, this.width]).padding(0.2);
    this.y = d3.scaleLinear().domain([0, 5]).range([this.height, 0]);
  }

  createSVGSizes(size: number, margin: number, labels: number) {
    return size + (margin * labels);
  }

  translation() {
    return `(${this.margin}, ${this.margin})`;
  }

  createSVG(): void {
    const width = this.createSVGSizes(this.width, this.margin, 2);
    const height = this.createSVGSizes(this.height, this.margin, 2);
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr(
        'viewBox', //// viewbox is for responsive width height
        `0 0 ${width + this.margin + this.margin} ${height + this.margin + this.margin
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
    this.svg.append("g")
      .attr('transform', "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x))
      .selectAll("text").attr('font-size', '20px')
      .attr('font-family', 'Poppins, sans-serif')
      .attr('fill', 'black')
      .attr('transform', 'translate(-10, 10) rotate(-45)');
  }

  yAxis(): void {
    this.svg.append("g").call(d3.axisLeft(this.y)).attr('font-family', 'Poppins, sans-serif').attr('font-size', '16px');
  }

  updateTechSkills = (skills: { [key: string]: number }) => {
    const newData: Skills[] = Object.keys(skills).map(
      name => ({ name, score: skills[name] })
    );

    this.drawBars(newData);
  }

  updateBars = (newData: Skills[]) => {
    console.log("It's updating");
    this.x.domain(newData.map(({ name }) => name));
    this.y.domain([0, 5]);

    const bars = this.svg.selectAll("rect").data(newData);

    bars.transition().duration(300)
      .attr("x", (d: any) => this.x(d.name))
      .attr("y", (d: any) => this.y(d.score))
      .attr("width", this.x.bandwidth())
      .attr("height", (d: any) => this.height - this.y(d.score));

    bars.enter().append("rect")
      .attr("x", ({ name }) => this.x(name))
      .attr("y", ({ score }) => this.y(score))
      .attr("width", this.x.bandwidth())
      .attr("height", ({ score }) => this.height - this.y(score))
    //.attr("fill", (d: any) => this.color(d.name)); :)

    bars.exit().remove();
  }

  updateText = (newData: Skills[]) => {
    this.x.domain(newData.map(({ name }) => name));
    this.y.domain([0, 5]);

    const texts = this.svg.selectAll(".label").data(newData);

    texts.attr("x", (d: any) => this.x(d.name) + this.x.bandwidth() / 2)
      .attr("y", (d: any) => this.y(d.score) + 330)
      .text((d: any) => d.name);

    texts.enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d: any) => this.x(d.name) + this.x.bandwidth() / 2)
      .attr("y", (d: any) => this.y(d.score) + 330)
      .text((d: any) => d.name);

    texts.exit().remove();
  }
}