export interface About {
  content: {
    name: string;
    title: string;
    description: string;
    quote: string;
    quoteFooter: string;
    softSkillsTitle: string;
    softSkills: string[];
  };
  socialLinks: {
    cv: string;
    github: string;
  };
  profileImage: string;
}
