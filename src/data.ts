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

// Semester name truncated, "WiSe 2016/17" becomes "WiSe 2016"
export type Semester = `WiSe ${Year}` | `SoSe ${Year}`;

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
  type: 'Bachelor' | 'Master';
  semester: SemesterData[];
};

// Example

const dsbw = {
  name: 'DS Betriebswirtschaft BA',
  short: 'DSBW BA',
  faculty: 1,
  fak: '1',
  campus: 'WS',
  number: 714,
  type: 'Bachelor',
  semester: [
    // TODO: this is fake data
    {
      semester: 'WiSe 2022',
      data: {
        total: 87,
        totalGerman: 86,
        maleGerman: 49,
        femaleGerman: 37,
        diverseGerman: 0,
        totalForeign: 1,
        maleForeign: 1,
        femaleForeign: 0,
        diverseForeign: 0,
        totalPause: 0,
        malePause: 0,
        femalePause: 0,
        diversePause: 0,
        totalBeginner: 27,
        maleBeginner: 13,
        femaleBeginner: 14,
        diverseBeginner: 0
      }
    },
    {
      semester: 'WiSe 2023',
      data: {
        total: 77,
        totalGerman: 76,
        maleGerman: 39,
        femaleGerman: 37,
        diverseGerman: 0,
        totalForeign: 1,
        maleForeign: 1,
        femaleForeign: 0,
        diverseForeign: 0,
        totalPause: 0,
        malePause: 0,
        femalePause: 0,
        diversePause: 0,
        totalBeginner: 27,
        maleBeginner: 13,
        femaleBeginner: 14,
        diverseBeginner: 0
      }
    }
  ]
} satisfies DegreeData;
const mi = {
  name: 'IS Medieninformatik BSc',
  short: 'ISMI BSc',
  faculty: 4,
  fak: '4',
  campus: 'ZI',
  number: 998,
  type: 'Bachelor',
  semester: [
    {
      semester: 'WiSe 2023',
      data: {
        total: 310,
        totalGerman: 267,
        maleGerman: 209,
        femaleGerman: 57,
        diverseGerman: 1,
        totalForeign: 43,
        maleForeign: 30,
        femaleForeign: 13,
        diverseForeign: 0,
        totalPause: 3,
        malePause: 3,
        femalePause: 0,
        diversePause: 0,
        totalBeginner: 70,
        maleBeginner: 53,
        femaleBeginner: 16,
        diverseBeginner: 1
      }
    }
  ]
} satisfies DegreeData;

export const degrees: DegreeData[] = [dsbw, mi];

export const faculties = degrees.reduce(
  (ff, d) => {
    ff.find((fac) => fac.number === d.faculty)?.degrees.push(d);
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
  NW: 'Neustadtswall'
} as const;

export function campusMap(short: string) {
  if (short in campus) {
    return campus[short as keyof typeof campus];
  }
  return campus.NW;
}
