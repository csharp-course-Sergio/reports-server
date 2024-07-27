import axios from 'axios';

export const chartJsToImage = async (chartConfig: unknown) => {
  const encondedUri = encodeURIComponent(JSON.stringify(chartConfig));

  const chartUrl = `https://quickchart.io/chart?c=${encondedUri}`;

  const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });

  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};
