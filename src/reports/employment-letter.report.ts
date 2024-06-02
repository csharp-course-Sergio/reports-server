import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 70],
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const getEmploymentLetter = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],
    header: {
      columns: [
        logo,
        {
          text: DateFormatter.getDDMMMMYYYY(new Date()),
          alignment: 'right',
          margin: [20, 20],
        },
      ],
    },
    content: [
      {
        text: `CONSTANCIA DE EMPLEO`,
        style: 'header',
      },
      {
        text: `
        Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa],
        por medio de la presente certifco que [Nombre del Empleado] ha sido empleado en nuestra
        empresa desde el [Fecha de Inicio del Empleado].\n
        Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del
        Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus
        labores.\n
        La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas
        semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y
        procedimientos establecidos por la empresa.\n
        Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.
        `,
        style: 'body',
      },
      {
        text: `
        Atentamente,
        [Nombre del Empleador]
        [Cargo del Empleador]
        [Nombre de la Empresa]
        [Fecha de Emisión]
        `,
        style: 'signature',
      },
    ],
    footer: {
      text: `Este documento es una constancia de empleo y no representa un compromiso laboral`,
      style: 'footer',
    },
  };

  return docDefinition;
};
