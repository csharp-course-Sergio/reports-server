import * as Utils from '../../helpers/chart-utils';

export const getLinesChart = async (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.NAMED_COLORS.green,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.green, 0.5),
        pointStyle: 'circle',
        pointRadius: 5,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return Utils.chartJsToImage(config, { width: 500, height: 200 });
};
