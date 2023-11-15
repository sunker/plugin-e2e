import { Response } from '@playwright/test';
import { PanelError } from './types';

export { expect, test, type PluginFixture, type PluginOptions } from './api';
export * from './e2e-selectors';
export * from './fixtures';
export * from './models';
export * from './types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PlaywrightTest {
    // @ts-ignore
    const r: unique symbol;
    // @ts-ignore
    const t: unique symbol;
    interface Matchers<R, T> {
      [r]: R;
      [t]: T;
      toHavePanelError(this: Matchers<unknown, PanelError>): R;
      toBeOK(this: Matchers<unknown, Promise<Response>>): R;
    }
  }
}
