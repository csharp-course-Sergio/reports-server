import fs from 'fs';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    return {
      content: [
        {
          svg: svgContent,
          width: 150,
        },
      ],
    };
  };
