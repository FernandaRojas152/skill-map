import { Injectable } from '@angular/core';
import { Skills } from './skills';
import { SKILLS } from './skills-list';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skills: Skills[] = SKILLS;
  public skillUpdated$ = new BehaviorSubject<Skills[]>(this.skills);

  constructor() { }

  getSkills(): Skills[] {
    return this.skills;
  }

  updateSkillRating(skillName: string, rating: number) {
    const skill = this.skills.find(skill => skill.name === skillName);
    if (skill) {
      skill.score = rating;
      this.skillUpdated$.next(this.skills);
    }
  }
}
