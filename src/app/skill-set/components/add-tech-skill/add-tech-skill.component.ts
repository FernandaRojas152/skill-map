import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fer-add-tech-skill',
  templateUrl: './add-tech-skill.component.html',
  styleUrls: ['./add-tech-skill.component.scss']
})
export class AddTechSkillComponent implements OnInit {
  newSkillForm: FormGroup;

  @Output() addSkill = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newSkillForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(1)])
    })
  }

  addNewSkill() {
    if (this.newSkillForm.invalid) return alert('Arregle el form pri');

    const newSkillName = this.newSkillForm?.value?.name;
    this.addSkill.emit(newSkillName);

  }
}
