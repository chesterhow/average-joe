declare module '*.svg' {
  const content: any;
  export default content;
}

interface Review {
  overall: number;
  coffee: number;
  aesthetic: number;
  seating: number;
  price: '$' | '$$' | '$$$';
  food: boolean;
  wifi: boolean;
}
