import { Component, OnInit } from '@angular/core';
import { Skills } from '../skills';
import { SkillService } from '../skill.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss']
})
export class SkillSetComponent implements OnInit {
  skills: Skills[];
  form: FormGroup;
  addSkillForm: FormGroup;

  constructor(private skillsService: SkillService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getSkills();

    this.form = this.fb.group({});
    this.skills.forEach(skill => {
      this.form.addControl(skill.name, this.fb.control(skill.score));
    });

    this.addSkillForm = this.fb.group({
      name: [''],
      myRatingControl: [''],
    });
  }

  getSkills() {
    this.skills = this.skillsService.getSkills();
  }

  editScore(name: string) {
    const rating = this.form.get(name).value;
    this.skillsService.updateSkillRating(name, rating);
  }

  addSkill() {
    const newSkill: Skills = {
      name: this.addSkillForm.value.name,
      score: this.addSkillForm.value.myRatingControl,
    };

    this.skillsService.addSkill(newSkill);

    console.log(this.skills);
    this.form.addControl(newSkill.name, this.fb.control(newSkill.score));
    this.addSkillForm.reset();
  }
}
