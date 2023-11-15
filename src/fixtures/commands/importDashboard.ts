import { expect, TestFixture } from '@playwright/test';
import { promises } from 'fs';
import path from 'path';
import { PluginFixture, PluginOptions } from '../../api';
import { DashboardPage } from '../../models/DashboardPage';
import { Dashboard, ImportDashboardArgs } from '../../types';
import { PlaywrightCombinedArgs } from '../types';

type ImportDashboardFixture = TestFixture<
  (args: ImportDashboardArgs) => Promise<DashboardPage>,
  PluginFixture & PluginOptions & PlaywrightCombinedArgs
>;

const importDashboard: ImportDashboardFixture = async ({ request, page, selectors, grafanaVersion }, use) => {
  await use(async (args) => {
    let buffer = await promises.readFile(path.join(process.cwd(), args.filePath), 'utf8');
    const dashboard = JSON.parse(buffer.toString());
    const importDashboardReq = await request.post('/api/dashboards/import', {
      data: {
        dashboard: {
          ...dashboard,
          id: null,
        },
        overwrite: true,
        inputs: [],
        folderUid: '',
      },
    });
    const text = await importDashboardReq.text();
    expect(importDashboardReq.ok(), `Failed to import dashboard: ${text}`).toBeTruthy();
    const dashboardJson: Dashboard = await importDashboardReq.json();
    const dashboardPage = new DashboardPage({ request, page, selectors, grafanaVersion }, expect, dashboardJson.uid);
    await dashboardPage.goto();
    return dashboardPage;
  });
};

export default importDashboard;
