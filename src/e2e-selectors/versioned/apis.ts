import { MIN_GRAFANA_VERSION } from './constants';

export const versionedAPIs = {
  DataSource: {
    getResource: {
      ///api/datasources/uid/**/resources/${path}`
      '9.4.4': '/api/datasources/uid/*/resources',
      [MIN_GRAFANA_VERSION]: '/api/datasources/*/resources',
    },
  },
};
