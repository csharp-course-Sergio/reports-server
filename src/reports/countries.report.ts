import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.sections';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  data: Country[];
}

export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, data } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subtitle: subtitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 130, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...data.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
    ],
  };
};
