import type { DegreeData, Semester } from '@/data';

export function getSemesterFromDegrees(
  ...degree: (DegreeData | undefined)[]
): Semester[] {
  const semester = degree
    .flatMap((d) => d?.semester || [])
    .map((s) => s.semester);

  return sortSemester(semester);
}

export function sortSemester(semester: Semester[]): Semester[] {
  const s = semester
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((s) => ({
      year: parseInt(s.substring(4, 8)),
      isWs: s.startsWith('WiSe'),
      raw: s
    }));

  s.sort((a, b) => {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    return a.isWs && !b.isWs ? 1 : -1;
  });

  return s.map((s) => s.raw);
}
