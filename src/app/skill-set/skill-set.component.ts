import { Component, OnInit } from '@angular/core';
import { Skills } from '../skills';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss']
})
export class SkillSetComponent implements OnInit {
  skills: Skills[] = [];


  constructor(private skillsService: SkillService) {
  }

  ngOnInit(): void {
    this.getSkills();

  }

  getSkills(){
    this.skills= this.skillsService.getSkills()
  }

}
