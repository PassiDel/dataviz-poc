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

const GenderNationalityKeys = [
  'totalGerman',
  'totalForeign',
  'femaleGerman',
  'maleGerman',
  'diverseGerman',
  'diverseForeign',
  'maleForeign',
  'femaleForeign'
] as const;

export function sumDegrees(
  faculty: (typeof faculties)[0],
  year: Semester = LATEST_YEAR
): DegreeData {
  return faculty.degrees.reduce(
    (fd, d) => {
      const lastSemester = d.semester.find((s) => s.semester === year);
      if (lastSemester) {
        GenderNationalityKeys.forEach(
          (k) => (fd.semester[0].data[k]!! += lastSemester.data[k] || 0)
        );
      }
      fd.campus = d.campus;
      return fd;
    },
    {
      name: faculty.name,
      short: faculty.number.toString(),
      faculty: faculty.number,
      fak: faculty.number.toString(),
      campus: 'NW',
      number: faculty.number,
      type: 'Bachelor',
      semester: [
        {
          semester: year,
          data: {
            totalGerman: 0,
            totalForeign: 0,
            femaleGerman: 0,
            maleGerman: 0,
            diverseGerman: 0,
            diverseForeign: 0,
            maleForeign: 0,
            femaleForeign: 0
          }
        }
      ]
    }
  );
}

export function sumCalcDegrees(
  faculty: (typeof faculties)[0],
  year: Semester = LATEST_YEAR
) {
  const dpt = faculty.degrees.reduce<
    { type: DegreeData['type']; amount: number; students: number }[]
  >((types, cur) => {
    const type = types.find((s) => s.type === cur.type);
    const selectedYear = cur.semester.find((s) => s.semester === year);
    const students = selectedYear?.data?.total || 0;
    if (!type) {
      types.push({
        type: cur.type,
        amount: year === LATEST_YEAR || selectedYear ? 1 : 0,
        students
      });
      return types;
    }
    type.amount++;
    type.students += students;
    return types;
  }, []);
  dpt.sort((a, b) => b.amount - a.amount);

  const sum = dpt.reduce((count, t) => count + t.students, 0);
  const sumDegrees = dpt.reduce((count, t) => count + t.amount, 0);

  const campus = new Set<DegreeData['campus']>();
  faculty.degrees.forEach((d) => campus.add(d.campus));
  return { dpt, sum, sumDegrees, campus: [...campus] };
}

export function degreeIcon(degree: DegreeData) {
  const hasLatestYear = degree.semester.some((s) => s.semester === LATEST_YEAR);
  if (!hasLatestYear) {
    return 'schedule';
  }
  return degree.semester.length > 2 ? `_` : 'crib';
}
