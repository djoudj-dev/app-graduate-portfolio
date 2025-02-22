import { About } from '../models/about.model';

export const ABOUT_MOCK: About = {
  content: {
    name: 'Nédellec Julien',
    title: "Concepteur & Développeur d'Applications Web | Angular & Node.js",
    description:
      'Développeur web spécialisé en Angular et Node.js, je conçois et développe des solutions performantes, évolutives et adaptées aux besoins spécifiques de chaque projet.',
    quote:
      "Issu de la chaudronnerie, j'ai appris à travailler avec rigueur et précision, des qualités que j'applique aujourd'hui au développement web. Curieux et en apprentissage constant, je construis des applications web en mettant l'accent sur la performance et l'adaptabilité. Mon objectif est de concevoir des solutions efficaces tout en continuant à monter en compétences et à explorer de nouvelles technologies.",
    quoteFooter: 'Mon parcours de reconversion professionnelle',
    softSkillsTitle: 'Savoir-être',
    softSkills: ['Autonome et rigoureux', 'Curieux et ouvert', 'Esprit d’équipe', 'Adaptabilité']
  },
  socialLinks: {
    cv: '/assets/cv.pdf',
    github: 'https://github.com/votre-username'
  },
  profileImage: '/images/LinkedInPhotoProfil.png'
};
