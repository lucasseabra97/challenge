import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import {ddbDocClient} from './dynamodbClient.js';

const TABLE_NAME = 'WebPageMetadata';

export const insertWebPageMetadata = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', JSON.stringify(error, null, 2));
  }
};

export const queryByUrl = async (url) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: '#url = :url',
    ExpressionAttributeNames: {
      '#url': 'url',
    },
    ExpressionAttributeValues: {
      ':url': url,
    },
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log('Query by URL result:', data.Items);
  } catch (error) {
    console.error('Error querying by URL:', JSON.stringify(error, null, 2));
  }
};

export const queryByDateRange = async (startDate, endDate) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'DateIndex',
    KeyConditionExpression: '#crawledDate BETWEEN :startDate AND :endDate',
    ExpressionAttributeNames: {
      '#crawledDate': 'crawledDate',
    },
    ExpressionAttributeValues: {
      ':startDate': startDate,
      ':endDate': endDate,
    },
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log('Query by Date Range result:', data.Items);
  } catch (error) {
    console.error('Error querying by Date Range:', JSON.stringify(error, null, 2));
  }
};

export const queryByPageTitle = async (pageTitle) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'TitleIndex',
    KeyConditionExpression: '#pageTitle = :pageTitle',
    ExpressionAttributeNames: {
      '#pageTitle': 'pageTitle',
    },
    ExpressionAttributeValues: {
      ':pageTitle': pageTitle,
    },
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log('Query by Page Title result:', data.Items);
  } catch (error) {
    console.error('Error querying by Page Title:', JSON.stringify(error, null, 2));
  }
};
