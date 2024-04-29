// TODO: add grades
export type YearDataCategories =
  | 'startMale'
  | 'startFemale'
  | 'startTotal'
  | 'startGerman'
  | 'startForeign'
  | 'startEduGerman'
  | 'startEduForeign'
  | 'startAllgHZB'
  | 'startFHReife'
  | 'startBeruflichQualifiziert'
  | 'startAuslHZB'
  | 'EndMale'
  | 'EndFemale'
  | 'EndTotal'
  | 'EndLteRSZ'
  | 'EndGtRSZ'
  | 'EndLteRSZ2'
  | 'EndGtRSZ2';

export type SemesterDataCategories =
  | 'male'
  | 'female'
  | 'total'
  | 'german'
  | 'foreign'
  | 'eduGerman'
  | 'eduForeign'
  | 'lteRSZ'
  | 'gtRSZ'
  | 'lteRSZ2'
  | 'gtRSZ2';

export type CohortCategories =
  | 'student'
  | 'changed'
  | 'finished'
  | 'left'
  | 'total';

// Include "Perc" as a prefix for percentage for all categories
export type YearDataCategoriesAll =
  | YearDataCategories
  | `${YearDataCategories}Perc`;
export type SemesterDataCategoriesAll =
  | SemesterDataCategories
  | `${SemesterDataCategories}Perc`;
export type CohortCategoriesAll = CohortCategories | `${CohortCategories}Perc`;

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
// Supports every year including 1000-9999
export type Year = `${Exclude<Digit, '0'>}${Digit}${Digit}${Digit}`;

// Data from "Studienbeginn (1)", "Studienbeginn (2)" and "Studienabschluss"
export type YearData = {
  year: Year;
  data: Partial<Record<YearDataCategoriesAll, number>>;
};

// Semester name truncated, "WiSe 2016/17" becomes "WiSe 2016"
export type Semester = `WiSe ${Year}` | `SoSe ${Year}`;

// Data from "Studium (1)"
export type SemesterData = {
  semester: Semester;
  data: Partial<Record<SemesterDataCategoriesAll, number>>;
};

// Data from "Studienverlaufsanalyse"
export type CohortData = {
  semester: Semester | 'total';
  data: Partial<Record<CohortCategoriesAll, number>>;
};

export type DegreeData = {
  name: string;
  short: string;
  faculty: number;
  RSZ: number;
  degree: number;
  yearOfData: Year;
  yearData: YearData[];
  cohort: CohortData[];
  semester: SemesterData[];
};

// Example

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */ //noinspection JSUnusedLocalSymbols
const ismi = {
  name: 'Internationaler Studiengang Medieninformatik B.Sc.',
  short: 'ISMI BSc',
  faculty: 4,
  degree: 998,
  RSZ: 7,
  yearOfData: '2023',
  yearData: [
    {
      year: '2016',
      data: {
        startMale: 65,
        startMalePerc: 76.5,
        startFemale: 20,
        startFemalePerc: 23.5,
        startTotal: 85,
        startTotalPerc: 100
      }
    },
    {
      year: '2017',
      data: {
        startMale: 59,
        startMalePerc: 72.8,
        startFemale: 22,
        startFemalePerc: 27.2,
        startTotal: 81,
        startTotalPerc: 100
      }
    }
  ],
  cohort: [
    {
      semester: 'WiSe 2012',
      data: {
        student: 18,
        studentPerc: 21.4,
        changed: 2,
        changedPerc: 2.4,
        finished: 32,
        finishedPerc: 38.1,
        left: 32,
        leftPerc: 38.1,
        total: 84,
        totalPerc: 100
      }
    },
    {
      semester: 'total',
      data: {
        student: 111,
        studentPerc: 22.7,
        changed: 16,
        changedPerc: 3.3,
        finished: 166,
        finishedPerc: 34,
        left: 195,
        leftPerc: 40,
        total: 488,
        totalPerc: 100
      }
    }
  ],
  semester: [
    {
      semester: 'WiSe 2012',
      data: {
        male: 261,
        malePerc: 81.1,
        female: 61,
        femalePerc: 18.9,
        total: 322,
        totalPerc: 100,
        german: 293,
        germanPerc: 91,
        foreign: 29,
        foreignPerc: 9,
        eduGerman: 19,
        eduGermanPerc: 65.5,
        eduForeign: 10,
        eduForeignPerc: 34.5,
        lteRSZ: 255,
        lteRSZPerc: 79.2,
        gtRSZ: 67,
        gtRSZPerc: 20.8,
        lteRSZ2: 290,
        lteRSZ2Perc: 90.1,
        gtRSZ2: 32,
        gtRSZ2Perc: 9.9
      }
    }
  ]
} satisfies DegreeData;
