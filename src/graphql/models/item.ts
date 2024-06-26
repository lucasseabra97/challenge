export const typeDef = /* GraphQL */ `
  type Query {
    item(url: String!, crawledDate: String!): Item!
    items: [Item]!
  }

  type Item {
    url: String!
    crawledDate: String!
    pageTitle: String!
    wordCount: Int! 
    metadata: Metadata!  
  }

  type Metadata {
    description: String!
    keywords: [String!]
  }
  
  input NewMetadataInput {
    description: String!
    keywords: [String!]
  }

  type Mutation {
    createItem(url: String!, pageTitle: String, metadata: NewMetadataInput!): Item!
    removeItem(url: String!, crawledDate: String!): Boolean
  }
`

const mockDataDB = [
    {
        url: 'https://example.com',
        crawledDate: '2024-06-18T12:00:00Z',
        pageTitle: 'Example Page',
        wordCount: 350,
        metadata: {
            description: 'An example web page',
            keywords: ['example', 'sample'],
        },
    },
    {
        url: 'https://example2.com',
        crawledDate: '2024-04-18T12:00:00Z',
        pageTitle: 'Example Page2',
        wordCount: 222,
        metadata: {
            description: 'An example web page2',
            keywords: ['example2', 'sample2'],
        },
    }
]

// Since I couldn't be able to create the table in dynamoDB 
// i decided to use mock Data of the representation data that I wanted
// to represent on the table 
export const resolvers = {
    Query: {
        // the idea would be here to call a DB instance that after would perform 
        // a query to retrieve the value based on the url and the crawledDate
        // since these 2 are the primary key 
        item: (_, args: { url: string; crawledDate: string }) => {
            const { url, crawledDate } = args;
            const item = mockDataDB.find(
              (entry) => entry.url === url && entry.crawledDate === crawledDate
            );
            if (!item) {
              throw new Error('Item not found');
            }
            return item;
          },

        items: () => {
            return mockDataDB
        }
    },

    Mutation: {
        createItem: (_, args: { url: string; pageTitle: string; metadata: { description: string; keywords: string[] } }) => {
            const { url, pageTitle, metadata } = args;
            const now = new Date();
            const newItem =  {
                url,
                crawledDate: now.toISOString(),
                pageTitle,
                wordCount: 230,
                metadata
            }
            mockDataDB.push(newItem);

            return newItem;
        },

        removeItem: (_, args: { url: string; crawledDate: string }) => {
            const { url, crawledDate } = args;
            const itemIndex = mockDataDB.findIndex(
                (entry) => entry.url === url && entry.crawledDate === crawledDate
            );
    
            mockDataDB.splice(itemIndex, 1);
            return true;
        }
    
    }
}   