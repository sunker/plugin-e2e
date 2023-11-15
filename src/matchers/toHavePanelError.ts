import { expect } from '@playwright/test';
import { PanelError } from '../types';

const toHavePanelError = async (panelError: PanelError, options?: { timeout?: number }) => {
  let pass = true;
  let actual;
  let message: any = '';

  try {
    const numberOfErrors = await panelError.getPanelError().count();
    await expect(numberOfErrors).toBe(1);
  } catch (error) {
    message = error;
    pass = false;
    actual = await panelError.getPanelError().count();
  }

  return {
    message: () => message,
    pass,
    name: 'toHavePanelError',
    expected: 1,
    actual,
  };
};

export default toHavePanelError;
