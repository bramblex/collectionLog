declare var require: any

declare module "*.json" {
  const value: any;
  export default value;
}

// declare namespace navigator {
//   let language: string;
//   let browserLanguage: string;
//   let systemLanguage: string;
//   let userLanguage: string;
//   let platform: string;
//   let userAgent: string;
// }