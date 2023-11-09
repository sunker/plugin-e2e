import { expect, test } from '../../src';

test('dashboard validation via goto', async ({ gotoDashboard }) => {
  const dashboardPage = await gotoDashboard({ uid: 'x9jSO5c7z' });
  await expect(dashboardPage).toHaveNPanelErrors(2);
});

test('dashboard validation via import', async ({ importDashboard }) => {
  const dashboardPage = await importDashboard({ filePath: 'tests/dashboards/cloudwatch.json' });
  await expect(dashboardPage).toHaveNPanelErrors(2);
});
