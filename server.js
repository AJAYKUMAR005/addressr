import CFonts from 'cfonts';
import debug from 'debug';
import { esConnect } from './client/elasticsearch';
import { printVersion } from './service/printVersion';
import { startServer } from './swagger';

const logger = debug('api');

startServer().then(() => {
  logger('connecting es client');
  const p1 = esConnect().then((esClient) => {
    global.esClient = esClient;
    logger('es client connected');
  });
  p1.then(() => {
    const bannerOptions = {
      font: '3d',
      align: 'center',
      colors: ['yellowBright', 'cyan'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0',
    };
    CFonts.say('Addressr|API|Server', bannerOptions);

    printVersion();
  });
});
