import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';

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
  const donutChart = await getDonutChart({
    entries: options.topCountries.map((c) => ({
      label: c.country,
      value: c.customers,
    })),
    position: 'left',
  });

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: donutChart,
        width: 500,
      },
    ],
  };

  return docDefinition;
};
