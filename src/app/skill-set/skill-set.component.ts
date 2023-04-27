import { Component, OnInit } from '@angular/core';
import { Skills } from '../skills';
import { SkillService } from '../skill.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss']
})
export class SkillSetComponent implements OnInit {
  form: FormGroup;
  addSkillForm: FormGroup;

  constructor(private skillsService: SkillService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initSkillForm();
    this.form = this.fb.group({});
    this.skills.forEach(skill => {
      this.form.addControl(skill.name, this.fb.control(skill.score));
    });

    this.addSkillForm = this.fb.group({
      name: ['', [Validators.required]],
      myRatingControl: [''],
    });
  }

  initSkillForm() {
    this.skillsService.initForm();
    this.skillsService.skillsForm.valueChanges.subscribe(console.log);
  }

  removeTechSkill(skillName: string) {
    this.skillsService.removeTechSkill(skillName);
  }

  onAddTechSkill(skillName: string) {
    this.skillsService.addTechSkill(skillName);
  }

  get techSkills() {
    return Object.keys(this.skillsService.skillsForm.controls);
  }

  get skillsForm() {
    return this.skillsService.skillsForm;
  }

  get skills() {
    return this.skillsService.skills
  }

  editScore(name: string, rating: number) {
    this.skillsService.updateSkillRating(name, rating);
  }

  addSkill() {
    const newSkill: Skills = {
      name: this.addSkillForm.value.name,
      score: this.addSkillForm.value.myRatingControl,
    };

    this.skillsService.addSkill(newSkill);
    this.form.addControl(newSkill.name, this.fb.control(newSkill.score));
    this.addSkillForm.reset();
  }
}
