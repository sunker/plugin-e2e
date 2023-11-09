import { Response } from '@playwright/test';
import { PanelEditPage, PanelError, PanelErrors } from './src';

export {};

declare global {
  namespace PlaywrightTest {
    const r: unique symbol;
    const t: unique symbol;
    interface Matchers<R, T> {
      [r]: R;
      [t]: T;
      toHavePanelError(this: Matchers<unknown, PanelError>): R;
    }
  }
}
