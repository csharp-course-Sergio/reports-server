import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { footerSection } from './sections/footer.sections';
import { CurrencyFormatter } from 'src/helpers';

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 16,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  address: {
    fontSize: 14,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;

  console.log(data);

  return {
    styles,
    header: logo,
    footer: footerSection,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'Tucan Code',
        style: 'header',
      },
      //   Dirección y número de recibo
      {
        columns: [
          {
            text: `15 Montgomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com`,
            style: 'address',
          },
          {
            text: [
              {
                text: 'Recibo No#: 10255\n',
                bold: true,
              },

              `Fecha del recibo: 11 de julio de 2021\nPagar antes de: 18 de mayo de 2024`,
            ],
            alignment: 'right',
          },
        ],
      },
      //   QR
      {
        qr: 'https://devtalles.com',
        fit: 75,
        alignment: 'right',
      },
      //   Datos del cliente
      {
        text: [
          {
            text: 'Cobrar a:\n',
            bold: true,
            fontSize: 14,
          },

          `\nRazón Social: Richter Supermarkt\nMichael Holz\nGrenzacherweg 237`,
        ],
      },
      // Tabla con detalles de la orden
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            [
              '1',
              'Producto 1',
              '1',
              '100',
              {
                text: CurrencyFormatter.formatCurrency(100),
                alignment: 'right',
                bold: true,
              },
            ],
            [
              '2',
              'Producto 2',
              '2',
              '200',
              {
                text: CurrencyFormatter.formatCurrency(1500),
                alignment: 'right',
                bold: true,
              },
            ],
            [
              '3',
              'Producto 3',
              '3',
              '300',
              {
                text: CurrencyFormatter.formatCurrency(900),
                alignment: 'right',
                bold: true,
              },
            ],
          ],
        },
      },
      '\n\n',
      // Tabla de totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              widths: ['auto', 'auto'],
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(3115.75),
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  'Total',
                  {
                    text: CurrencyFormatter.formatCurrency(3520.8),
                    bold: true,
                    alignment: 'right',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
