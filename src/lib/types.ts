export type Language = 'ar' | 'en';

export interface LocalizedContent {
  ar: string;
  en: string;
}

export interface Branch {
  id: string;
  active: boolean;
  ar: {
    name: string;
    address: string;
    city: string;
  };
  en: {
    name: string;
    address: string;
    city: string;
  };
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Job {
  id: string;
  active: boolean;
  ar: {
    title: string;
    description: string;
    requirements: string[];
  };
  en: {
    title: string;
    description: string;
    requirements: string[];
  };
}

export interface Partner {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  active: boolean;
}

export interface CareerFormData {
  fullName: string;
  phone: string;
  city: string;
  position: string;
  experience: string;
  notes: string;
  file?: File;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContentData {
  settings: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  hero: {
    ar: {
      title: string;
      subtitle: string;
      description: string;
    };
    en: {
      title: string;
      subtitle: string;
      description: string;
    };
  };
  about: {
    ar: {
      title: string;
      description: string;
      vision: string;
      mission: string;
    };
    en: {
      title: string;
      description: string;
      vision: string;
      mission: string;
    };
  };
  services: {
    ar: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
    en: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
  };
  whyUs: {
    ar: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    en: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  cta: {
    ar: {
      title: string;
      description: string;
      requestService: string;
      applyJob: string;
    };
    en: {
      title: string;
      description: string;
      requestService: string;
      applyJob: string;
    };
  };
  contact: {
    ar: {
      title: string;
      subtitle: string;
    };
    en: {
      title: string;
      subtitle: string;
    };
  };
  footer: {
    ar: {
      rights: string;
      company: string;
    };
    en: {
      rights: string;
      company: string;
    };
  };
}

