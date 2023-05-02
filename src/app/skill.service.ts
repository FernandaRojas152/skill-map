import { Injectable } from '@angular/core';
import { Skills } from './skills';
import { SKILLS } from './skills-list';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillUpdated$ = new BehaviorSubject<Skills[]>(SKILLS);
  public skills$ = this.skillUpdated$.asObservable();

  public skillsForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  get skills(){
    return this.skillUpdated$.value;
  }

  initForm() {
    this.skillsForm = this.fb.group({});
  }

  addTechSkill(skillName: string) {
    const defaultSkillValue = 3;
    const newSkill = this.fb.control(defaultSkillValue);
    this.skillsForm.addControl(skillName, newSkill);
  }

  removeTechSkill(skillName: string) {
    this.skillsForm.removeControl(skillName);
  }

  addSkill(skill: Skills){
    const skills= this.skills;
    skills.push(skill);
    this.skillUpdated$.next(skills);
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
