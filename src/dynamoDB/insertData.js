import { insertWebPageMetadata } from './dynamodbUtils.js';

const item = {
  url: 'https://example.com',
  crawledDate: '2024-06-18T12:00:00Z',
  pageTitle: 'Example Page',
  wordCount: 350,
  metadata: {
    description: 'An example web page',
    keywords: ['example', 'sample'],
  },
};

insertWebPageMetadata(item);
