import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  hello() {
    const printer = new PdfPrinter(fonts);

    const docDefinition: TDocumentDefinitions = {
      content: 'Hola mundo',
    };

    const doc = printer.createPdfKitDocument(docDefinition);
    return doc;
  }
}
