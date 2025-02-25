import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { About } from '../models/about.model';

export interface AboutFormData {
  content: {
    name: string;
    title: string;
    description: string;
    quote: string;
    quoteFooter: string;
    softSkillsTitle: string;
    soft_skills: string[];
  };
  socialLinks: {
    cv: string;
    github: string;
    linkedin: string;
  };
  profileImage: string;
}

export class AboutFormConfig {
  static getFormGroup(fb: FormBuilder, about: About | null): FormGroup {
    return fb.group({
      content: fb.group({
        name: [about?.name || '', [Validators.required]],
        title: [about?.title || '', [Validators.required]],
        description: [about?.description || '', []],
        quote: [about?.quote || '', []],
        quoteFooter: [about?.quoteFooter || '', []],
        softSkillsTitle: [about?.softSkillsTitle || '', []],
        soft_skills: fb.array(about?.soft_skills?.map((skill) => fb.control(skill)) || [])
      }),
      socialLinks: fb.group({
        cv: [about?.cvLink || '', []],
        github: [about?.githubLink || '', []],
        linkedin: [about?.linkedinLink || '', []]
      }),
      profileImage: [about?.profileImage || '', []]
    });
  }

  static mapFormDataToAbout(formData: AboutFormData): About {
    return {
      name: formData.content.name,
      title: formData.content.title,
      description: formData.content.description,
      quote: formData.content.quote,
      quoteFooter: formData.content.quoteFooter,
      softSkillsTitle: formData.content.softSkillsTitle,
      soft_skills: formData.content.soft_skills,
      cvLink: formData.socialLinks.cv,
      githubLink: formData.socialLinks.github,
      linkedinLink: formData.socialLinks.linkedin,
      profileImage: formData.profileImage
    };
  }
}
