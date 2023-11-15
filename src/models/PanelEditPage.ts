const lte = require('semver/functions/lte');
import { Expect, Locator } from '@playwright/test';

import { PanelError, PluginTestCtx, RequestOptions, Visualization } from '../types';
import { DataSourcePicker } from './DataSourcePicker';
import { GrafanaPage } from './GrafanaPage';
import { TablePanel } from './TablePanel';
import { TimeRange } from './TimeRange';
import { TimeSeriesPanel } from './TimeSeriesPanel';

export class PanelEditPage extends GrafanaPage implements PanelError {
  datasource: DataSourcePicker;
  tablePanel: TablePanel;
  timeRange: TimeRange;
  timeSeriesPanel: TimeSeriesPanel;

  constructor(ctx: PluginTestCtx, expect: Expect<any>) {
    super(ctx, expect);
    this.datasource = new DataSourcePicker(ctx, expect);
    this.tablePanel = new TablePanel(ctx, this.expect);
    this.timeRange = new TimeRange(ctx, this.expect);
    this.timeSeriesPanel = new TimeSeriesPanel(ctx, this.expect);
  }

  async setVisualization(visualization: Visualization) {
    await this.getByTestIdOrAriaLabel(this.ctx.selectors.components.PanelEditor.toggleVizPicker).click();

    await this.getByTestIdOrAriaLabel(this.ctx.selectors.components.PluginVisualization.item(visualization)).click();
  }

  getVisualizationName() {
    return this.getByTestIdOrAriaLabel(this.ctx.selectors.components.PanelEditor.toggleVizPicker);
  }

  async setPanelTitle(title: string) {
    const isVisible = await this.getByTestIdOrAriaLabel(
      this.ctx.selectors.components.OptionsGroup.group('Panel options')
    )
      .locator('input')
      .first()
      .isVisible();
    if (!isVisible) {
      // expand panel options if not visible
      await this.getByTestIdOrAriaLabel(this.ctx.selectors.components.OptionsGroup.group('Panel options'))
        .locator('button')
        .click();
    }
    await this.getByTestIdOrAriaLabel(this.ctx.selectors.components.OptionsGroup.group('Panel options'))
      .locator('input')
      .first()
      .fill(title);
  }

  async apply() {
    await this.ctx.page.getByTestId(this.ctx.selectors.components.PanelEditor.applyButton).click();
  }

  getQueryEditorRow(refId: string): Locator {
    //TODO: add new selector and use it in grafana/ui
    const locator = this.ctx.page.locator('[aria-label="Query editor row"]').filter({
      has: this.ctx.page.locator(`[aria-label="Query editor row title ${refId}"]`),
    });
    this.expect(locator).toBeVisible();
    return locator;
  }

  getPanelError() {
    const grafanaVersion = this.ctx.grafanaVersion;
    let selector = this.ctx.selectors.components.Panels.Panel.status('error');
    if (lte(grafanaVersion, '9.4.3')) {
      selector = this.ctx.selectors.components.Panels.Panel.headerCornerInfo('error');
    } else if (lte(grafanaVersion, '10.1.5')) {
      selector = 'Panel status';
    }

    return this.getByTestIdOrAriaLabel(selector);
  }

  async refreshPanel(options?: RequestOptions) {
    const responsePromise = this.ctx.page.waitForResponse((resp) => resp.url().includes('/query'), options);
    // in older versions of grafana, the refresh button is rendered twice. this is a workaround to click the correct one
    await this.getByTestIdOrAriaLabel(this.ctx.selectors.components.PanelEditor.General.content)
      .locator(`selector=${this.ctx.selectors.components.RefreshPicker.runButtonV2}`)
      .click();

    return responsePromise;
  }
}
