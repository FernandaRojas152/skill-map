import { Injectable } from '@angular/core';
import { Skills } from './skills';
import { SKILLS } from './skills-list';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillUpdated$ = new BehaviorSubject<Skills[]>(SKILLS);
  public skills$ = this.skillUpdated$.asObservable();

  constructor() { }

  get skills(){
    return this.skillUpdated$.value;
  }

  addSkill(skill: Skills){
    const skills= this.skills;
    skills.push(skill);
    this.skillUpdated$.next(skills);
  }

  deleteSkill(skill: Skills){
  }

  updateSkillRating(skillName: string, rating: number) {
    const skills= this.skills;
    const skill = skills.find(skill => skill.name === skillName);
    if (skill) {
      skill.score = rating;
      this.skillUpdated$.next(skills);
    }
  }
}
