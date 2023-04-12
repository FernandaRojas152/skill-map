import { Injectable } from '@angular/core';
import { Skills } from './skills';
import { SKILLS } from './skills-list';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor() { }

  getSkills():Skills[]{
    return SKILLS;
  }
}
