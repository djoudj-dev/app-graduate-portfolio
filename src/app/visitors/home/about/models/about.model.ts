export interface About {
  content: {
    title: string;
    subtitle: string;
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
