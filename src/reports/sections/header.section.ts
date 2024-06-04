import type { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, showDate = true, showLogo = true, subtitle } = options;

  const headerLogo: Content = showLogo ? logo : '';

  const headerTitle: Content = title
    ? {
        text: title,
        style: {
          bold: true,
        },
      }
    : null;

  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : '';

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
