export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [lang: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cioc?: string;
  independent?: boolean;
  status: string;
  unMember: boolean;
  currencies?: {
    [currency: string]: {
      symbol: string;
      name: string;
    };
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  capital: string[];
  altSpellings?: string[];
  region: string;
  subregion?: string;
  languages?: {
    [lang: string]: string;
  };
  latlng: [number, number];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms?: {
    [lang: string]: {
      f: string;
      m: string;
    };
  };
  cca3: string;
  translations: {
    [lang: string]: {
      official: string;
      common: string;
    };
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  population: number;
  startOfWeek?: string;
  timezones?: string[];
  continents?: string[];
  fifa?: string;
  gini?: { [year: string]: number };
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
}
