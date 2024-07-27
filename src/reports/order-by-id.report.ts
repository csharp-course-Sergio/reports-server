import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { footerSection } from './sections/footer.sections';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';

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

  const { customers, order_details } = data;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

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
                text: `Recibo No#: ${data.order_id}\n`,
                bold: true,
              },

              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(data.order_date)}`,
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

          `\nRazón Social: ${customers.customer_name}
          Contacto: ${customers.contact_name}
          Dirección: ${customers.address}, ${customers.city}, ${customers.country}`,
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
            ...order_details.map((detail) => [
              detail.order_detail_id,
              detail.products.product_name,
              detail.quantity,
              {
                text: CurrencyFormatter.formatCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                bold: true,
                alignment: 'right',
              },
            ]),
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
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  'Total',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal * 1.15),
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
