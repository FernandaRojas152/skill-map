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

    this.addSkillForm = this.fb.group({
      name: ['', [Validators.required]],
      myRatingControl: [''],
    });
  }

  initSkillForm() {
    this.skillsService.initForm();
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

  editScore(name: string, rating: number) {
    this.skillsService.updateSkillRating(name, rating);
  }
}
