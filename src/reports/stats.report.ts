import type { TDocumentDefinitions } from "pdfmake/interfaces";

export const statsReport = async (): Promise<TDocumentDefinitions> => {
const docDefinition: TDocumentDefinitions = {
    content: [`Hola mundo desde Stats`],
  };

  return docDefinition;
}