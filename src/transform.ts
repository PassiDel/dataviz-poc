import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'path';
import { readFile, writeFile } from 'node:fs/promises';
import type { DegreeData, Semester } from './data';

const modulePath = dirname(fileURLToPath(import.meta.url));
readFile(resolve(modulePath, 'assets/Fakultatsdaten_gefiltert.json'))
  .then<DegreeData[]>((f) => JSON.parse(f.toString()))
  .then((d) => {
    const merged = d.reduceRight<DegreeData[]>(
      (degrees, { semester, faculty, number, ...degree }) => {
        if ((degree.type as string) === 'nan' || semester.length < 1) {
          return degrees;
        }
        const s = {
          ...semester[0],
          semester: semester[0].semester.substring(0, 8) as Semester
        };

        const deg = degrees.find((d) => d.number === parseInt(number as any));
        if (!deg) {
          degrees.push({
            ...degree,
            faculty: parseInt(faculty as any),
            number: parseInt(number as any),
            semester: [s]
          });
          return degrees;
        }
        if (deg.faculty <= 0 && parseInt(faculty as any) > 0) {
          deg.faculty = parseInt(faculty as any);
        }
        deg.semester.push(s);
        return degrees;
      },
      []
    );
    console.table(d.slice(0, 10));
    console.table(
      merged.slice(0, 10).map(({ semester, ...d }) => ({
        ...d,
        semester: semester.map((s) => s.semester).join(', ')
      }))
    );
    console.log(`from ${d.length} to ${merged.length}`);
    return merged;
  })
  .then((d) =>
    writeFile(
      resolve(modulePath, 'assets/daten.json'),
      JSON.stringify(d, undefined, 2),
      {
        flag: 'w+'
      }
    )
  )
  .then(() => console.log('file written!'));
