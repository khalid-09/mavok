export interface Navbar {
  id: string;
  navLinks: {
    label: string;
    url: string;
  }[];
  logo: string;
}

export interface HeroSection {
  id: string;
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

export interface Footer {
  id: string;
  date_created: string;
  navLinks: {
    title: string;
    links: {
      label: string;
      url: string;
    }[];
  }[];
  socials: { socialImage: string; url: string }[];
  paymentImages: {
    id: number;
    footer_id: string;
    directus_files_id: string;
  }[];
  "paymentImages.*": unknown;
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
