import { test } from '../../src';
import { ds } from './datasource';
import { QUERY_DATA_ANNOTATION_RESPONSE } from './mocks/queryDataResponse';

test('annotation editor with existing ds', async ({ annotationEditPage, page, selectors }) => {
  await annotationEditPage.mockQueryDataResponse(QUERY_DATA_ANNOTATION_RESPONSE);
  await annotationEditPage.datasource.set(ds.name!);
  await annotationEditPage.getCodeEditor().then((l) => l.click());
  await page.keyboard.insertText('SELECT starttime, eventname FROM event ORDER BY eventname ASC LIMIT 5 ');
  await annotationEditPage.runQuery();
  await annotationEditPage.expectRunQueryResultToContainText('5 events (from 2 fields)');
});
