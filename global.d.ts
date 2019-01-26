declare var require: any

declare module "*.json" {
  const value: any;
  export default value;
}

interface Navigator {
  language: string;
  browserLanguage: string;
  systemLanguage: string;
  userLanguage: string;
  platform: string;
  userAgent: string;
}

interface ObjectConstructor {
  assign: any
}

interface window {
  XMLHttpRequest: any
}