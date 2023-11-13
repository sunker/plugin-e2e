import { expect, test } from '../../src';
import { ds } from './datasource';
import {
  QUERY_DATA_ERROR_RESPONSE,
  QUERY_DATA_QUERY_A_RESPONSE,
  QUERY_DATA_TIMESERIES_RESPONSE,
} from './mocks/queryDataResponse';
import { TABLE_RESPONSE } from './mocks/resourceResponse';

test('autocompletion engine should load tables', async ({ panelEditPage, page }) => {
  await panelEditPage.datasource.set(ds.name!);
  const queryEditorRow = await panelEditPage.getQueryEditorRow('A');

  await panelEditPage.getCodeEditor(queryEditorRow).then((l) => l.click());
  await page.keyboard.insertText('SELECT * FROM ');
  const tablesReq = page.waitForRequest((req) => req.url().includes('resources/tables'));
  page.keyboard.press('Control+Space');
  await expect(await tablesReq).toBeTruthy();
});

test('should load schemas and display them on screen when clicking on schema dropdown', async ({
  panelEditPage,
  page,
}) => {
  await panelEditPage.datasource.set(ds.name!);

  await panelEditPage.mockResourceResponse('schemas', ['schema1', 'schema2']);
  const schemasReq = page.waitForRequest((req) => req.url().includes('resources/schemas'));
  await page.click('[data-testid="data-testid schema"] input');
  await expect(await schemasReq).toBeTruthy();
  await expect(page.getByText('average_temperature')).toBeTruthy();
});

test('fill in new query, run it and assert on result in table panel', async ({ panelEditPage, page }) => {
  await panelEditPage.mockQueryDataResponse(QUERY_DATA_QUERY_A_RESPONSE);
  await panelEditPage.mockResourceResponse('tables', TABLE_RESPONSE);
  await panelEditPage.setVisualization('Table');
  await panelEditPage.datasource.set(ds.name!);
  await panelEditPage.timeRange.set({ from: '2021-01-01', to: '2021-01-02' });
  const queryEditorRow = await panelEditPage.getQueryEditorRow('A');

  // ds specific tests
  await panelEditPage.getByTestIdOrAriaLabel('data-testid table', queryEditorRow).locator('input').click();
  await page.getByText('average_temperature').last().click();
  await panelEditPage.getCodeEditor(queryEditorRow).then((l) => l.click());
  await page.keyboard.insertText('SELECT eventname FROM event ORDER BY eventname ASC LIMIT 1');

  await panelEditPage.refreshPanel();
  await panelEditPage.tablePanel.expectToContainText('RESULT 1');
});

test('fill in new query, run it and assert on result in timeseries panel', async ({ panelEditPage, page }) => {
  await panelEditPage.mockQueryDataResponse(QUERY_DATA_TIMESERIES_RESPONSE);
  await panelEditPage.mockResourceResponse('tables', TABLE_RESPONSE);
  await panelEditPage.setVisualization('Time series');
  await panelEditPage.datasource.set(ds.name!);
  await panelEditPage.timeRange.set({ from: '2008-01-01', to: '2008-01-03' });
  const queryEditorRow = await panelEditPage.getQueryEditorRow('A');

  // ds specific tests
  await panelEditPage.getByTestIdOrAriaLabel('data-testid table', queryEditorRow).locator('input').click();
  await page.getByText('average_temperature').last().click();
  await panelEditPage.getCodeEditor(queryEditorRow).then((l) => l.click());
  await page.keyboard.insertText('SELECT starttime,eventid,dateid FROM event ORDER BY starttime ASC LIMIT 100');

  await panelEditPage.refreshPanel();
  await panelEditPage.timeSeriesPanel.expectToContainLegendLabels(['eventid', 'dateid']);
});

test('fill in bad query, run it and assert that panel has error', async ({ panelEditPage, page }) => {
  await panelEditPage.datasource.set(ds.name!);
  const queryEditorRow = await panelEditPage.getQueryEditorRow('A');
  await panelEditPage.getCodeEditor(queryEditorRow).then((l) => l.click());
  await page.keyboard.insertText('!!SELECT');
  await panelEditPage.mockQueryDataResponse(QUERY_DATA_ERROR_RESPONSE);
  await panelEditPage.refreshPanel();
  await expect(panelEditPage).toHavePanelError();
});
