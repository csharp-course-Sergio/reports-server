import fs from 'fs';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar',
    data: {
      labels: [2012, 2013, 2014, 2015, 2016],
      datasets: [
        {
          label: 'Users',
          data: [120, 60, 50, 180, 120],
        },
      ],
    },
  };

  return Utils.chartJsToImage(chartConfig);
};

export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    const chart = await generateChartImage();

    return {
      content: [
        {
          svg: svgContent,
          width: 100,
          fit: [100, 100],
        },
        {
          image: chart,
          width: 500,
        },
      ],
    };
  };
