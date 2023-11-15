import { TestFixture } from '@playwright/test';
import { PluginFixture, PluginOptions } from '../api';
import { E2ESelectors, resolveSelectors } from '../e2e-selectors';
import { versionedAPIs, versionedComponents, versionedPages } from '../e2e-selectors/versioned';
import { PlaywrightCombinedArgs } from './types';

type SelectorFixture = TestFixture<E2ESelectors, PluginFixture & PluginOptions & PlaywrightCombinedArgs>;

const selectors: SelectorFixture = async ({ grafanaVersion }, use) => {
  const selectors = resolveSelectors(
    {
      components: versionedComponents,
      pages: versionedPages,
      apis: versionedAPIs,
    },
    grafanaVersion
  );
  await use(selectors);
};

export default selectors;
