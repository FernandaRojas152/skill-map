import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { Skills } from './skills';

@Injectable({
  providedIn: 'root'
})
export class ChartsConfigurationService {
  skills: Skills[];
  
  constructor() { }

  calculateDimensions(size: number, margin: number, label: number) {
    return this.calculateSize(size, margin, label);
  }

  calculateSize(size: number, margin: number, labels: number) {
    return size - (margin * labels);
  }

  createScales(data: Skills[], width: number, height: number) {
    const x = d3.scaleBand().domain(data.map(d => d.name)).range([0, width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, 5]).range([height, 0]);
  }

  generateColors() {
    this.skills.forEach((skill) => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = Math.random().toFixed(2);
      skill.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    });
  }
}
