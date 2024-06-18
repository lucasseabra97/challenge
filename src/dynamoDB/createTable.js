import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' }); 

const dynamoDB = new AWS.DynamoDB();

const params = {
  TableName: 'WebPageMetadata',
  KeySchema: [
    { AttributeName: 'url', KeyType: 'HASH' },  // Partition key
    { AttributeName: 'crawledDate', KeyType: 'RANGE' }  // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'url', AttributeType: 'S' },
    { AttributeName: 'crawledDate', AttributeType: 'S' },
    { AttributeName: 'pageTitle', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'DateIndex',
      KeySchema: [
        { AttributeName: 'crawledDate', KeyType: 'HASH' },
        { AttributeName: 'url', KeyType: 'RANGE' }
      ],
      Projection: { ProjectionType: 'ALL' },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      IndexName: 'TitleIndex',
      KeySchema: [
        { AttributeName: 'pageTitle', KeyType: 'HASH' },
        { AttributeName: 'url', KeyType: 'RANGE' }
      ],
      Projection: { ProjectionType: 'ALL' },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ]
};

dynamoDB.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
