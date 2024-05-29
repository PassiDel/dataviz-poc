import degreesJson from './assets/daten.json';

export type SemesterDataCategories =
  | 'total'
  | 'totalGerman'
  | 'maleGerman'
  | 'femaleGerman'
  | 'diverseGerman'
  | 'totalForeign'
  | 'maleForeign'
  | 'femaleForeign'
  | 'diverseForeign'
  | 'totalPause'
  | 'malePause'
  | 'femalePause'
  | 'diversePause'
  | 'totalBeginner'
  | 'maleBeginner'
  | 'femaleBeginner'
  | 'diverseBeginner';

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
// Supports every year including 1000-9999
export type Year = `${Exclude<Digit, '0'>}${Digit}${Digit}${Digit}`;

// Semester name truncated, "WiSe2016/17" becomes "WiSe2016"
export type Semester = `WiSe${Year}` | `SoSe${Year}`;

// Data from "Studium (1)"
export type SemesterData = {
  semester: Semester;
  data: Partial<Record<SemesterDataCategories, number>>;
};

export type DegreeData = {
  name: string;
  short: string;
  faculty: number;
  fak: string;
  campus: string;
  number: number;
  type: 'Bachelor' | 'Master' | 'Diplom';
  semester: SemesterData[];
};

export const degrees = degreesJson as DegreeData[];

export const LATEST_YEAR: Semester = 'WiSe2023';

export const faculties = degrees.reduce(
  (ff, d) => {
    ff.find((fac) => fac.number === d.faculty)?.degrees.push(d);
    if (!ff.find((fac) => fac.number === d.faculty)) {
      console.warn(d.faculty, d);
    }
    return ff;
  },
  [
    {
      name: 'Fakultät 1',
      number: 1,
      degrees: []
    },
    {
      name: 'Fakultät 2',
      number: 2,
      degrees: []
    },
    {
      name: 'Fakultät 3',
      number: 3,
      degrees: []
    },
    {
      name: 'Fakultät 4',
      number: 4,
      degrees: []
    },
    {
      name: 'Fakultät 5',
      number: 5,
      degrees: []
    }
  ] as { name: string; number: number; degrees: DegreeData[] }[]
);

export const campus = {
  WS: 'Werderstraße',
  IG: 'IGC',
  ZI: 'ZIMT',
  NW: 'Neustadtswall',
  HÖ: 'Hö?'
} as const;

export function campusMap(short: string, returnNWAsDefault = true) {
  if (short in campus) {
    return campus[short as keyof typeof campus];
  }
  return returnNWAsDefault ? campus.NW : short;
}

export const categoryMap: { [k in SemesterDataCategories]: string } = {
  total: 'Insgesamt',
  totalGerman: 'Insgesamt Deutsch',
  maleGerman: 'Deutsch Männlich',
  femaleGerman: 'Deutsch Weiblich',
  diverseGerman: 'Deutsch Divers',
  totalForeign: 'Insgesamt Ausländisch',
  maleForeign: 'Ausländisch Männlich',
  femaleForeign: 'Ausländisch Weiblich',
  diverseForeign: 'Ausländisch Divers',
  totalPause: 'Insgesamt Urlaub',
  malePause: 'Urlaub Männlich',
  femalePause: 'Urlaub Weiblich',
  diversePause: 'Urlaub Divers',
  totalBeginner: 'Insgesamt StuAnf',
  maleBeginner: 'StuAnf Männlich',
  femaleBeginner: 'StuAnf Weiblich',
  diverseBeginner: 'StuAnf Divers'
};
export const degreeKeyMap: {
  [k in keyof Omit<DegreeData, 'semester'>]: string;
} = {
  number: 'Nummer',
  name: 'Name',
  short: 'Kurz',
  faculty: 'Fakultät',
  fak: '(Sub-)Fakultät',
  campus: 'Campus',
  type: 'Art'
};
