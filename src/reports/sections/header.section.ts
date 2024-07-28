import type { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  width: 100,
  fontSize: 12,
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subtitle, showDate = true, showLogo = true } = options;

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate ? currentDate : '';

  const headerSubtitle: Content = subtitle
    ? {
        text: subtitle,
        margin: [0, 2, 0, 0],
        alignment: 'center',
        style: {
          fontSize: 16,
        },
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            margin: [0, 15, 0, 0],
            alignment: 'center',
            style: {
              bold: true,
              fontSize: 22,
            },
          },
          headerSubtitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
