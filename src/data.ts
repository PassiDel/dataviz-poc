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

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */ //noinspection JSUnusedLocalSymbols
const dsbw = {
  name: 'DS Betriebswirtschaft BA',
  short: 'DSBW BA',
  faculty: 1,
  fak: '1',
  campus: 'WS',
  number: 714,
  type: 'Bachelor',
  semester: [
    {
      semester: 'WiSe 2023',
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
    }
  ]
} satisfies DegreeData;

// TODO: get from data
export const faculties = [
  {
    name: 'Fakultät 1',
    number: 1,
    degrees: [
      { name: 'AAA B.Sc.', slug: '1aaa' },
      { name: 'BBB M.Sc.', slug: '1bbb' }
    ]
  },
  {
    name: 'Fakultät 2',
    number: 2,
    degrees: [
      { name: 'AAA B.Sc.', slug: '2aaa' },
      { name: 'BBB M.Sc.', slug: '2bbb' }
    ]
  },
  {
    name: 'Fakultät 3',
    number: 3,
    degrees: [
      { name: 'AAA B.Sc.', slug: '3aaa' },
      { name: 'BBB M.Sc.', slug: '3bbb' }
    ]
  },
  {
    name: 'Fakultät 4',
    number: 4,
    degrees: [
      { name: 'AAA B.Sc.', slug: '4aaa' },
      { name: 'BBB M.Sc.', slug: '4bbb' }
    ]
  },
  {
    name: 'Fakultät 5',
    number: 5,
    degrees: [
      { name: 'AAA B.Sc.', slug: '5aaa' },
      { name: 'BBB M.Sc.', slug: '5bbb' }
    ]
  }
];
