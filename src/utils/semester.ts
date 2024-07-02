import {
  categoryMap,
  type DegreeData,
  type Semester,
  type SemesterData,
  type SemesterDataCategories
} from '@/data';

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

export function sortSemesterData(data: SemesterData[]): SemesterData[] {
  const s = data.map((s) => ({
    year: parseInt(s.semester.substring(4, 8)),
    isWs: s.semester.startsWith('WiSe'),
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

export function sumYears(data: SemesterData[]): SemesterData[] {
  return data.reduce<SemesterData[]>((semester, currentSemester) => {
    const year = currentSemester.semester.substring(4);

    const yearData = semester.find((s) => s.semester.endsWith(year));

    if (!yearData) {
      semester.push({
        semester: `WiSe${year}` as Semester,
        data: { ...currentSemester.data }
      });
      return semester;
    }

    Object.keys(categoryMap).forEach((_k) => {
      const k = _k as SemesterDataCategories;
      yearData.data[k] =
        (yearData.data[k] || 0) + (currentSemester.data[k] || 0);
    });

    return semester;
  }, []);
}
