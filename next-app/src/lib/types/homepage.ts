export interface HeroSection {
  id: string;
  navLinks: {
    label: string;
    url: string;
  }[];
  features: {
    title: string;
    description: string;
  }[];
  heroImage: string;
  description: string;
  heading: string;
  heroButton: {
    buttonText: string;
    buttonLink: string;
  }[];
}

export interface AboutSection {
  id: string;
  video: string;
  heading: string;
  description: string;
}

export interface FooterLinks {
  date_created: string;
  id: string;
  title: string;
  links: {
    label: string;
    url: string;
  }[];
}

export interface FAQs {
  date_created: string;
  id: string;
  content: { question: string; answer: string }[];
}

export interface InsideBox {
  id: string;
  title: string;
  description: string;
  content: { text: string }[];
}
