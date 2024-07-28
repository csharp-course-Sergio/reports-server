import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';
import { headerSection } from './sections/header.section';
import { getLinesChart } from './charts/line.chart';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  topCountries: TopCountry[];
}

export const statsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers,
      })),
      position: 'left',
    }),
    getLinesChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: 'Reporte de estadísticas',
      subtitle: 'Top 10 países con más clientes',
      showDate: true,
      showLogo: true,
    }),
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 países con más clientes',
                alignment: 'center',
                margin: [0, 0, 0, 10],
              },
              {
                image: donutChart,
                width: 320,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['País', 'Clientes'],
                ...options.topCountries.map((c) => [c.country, c.customers]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20],
      },
    ],
  };

  return docDefinition;
};
