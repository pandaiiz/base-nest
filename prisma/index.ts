import { createSchema } from 'schemix'

createSchema({
  basePath: __dirname,
  datasource: {
    provider: 'postgresql',
    url: { env: 'PG_DATABASE_URL' },
    relationMode: 'prisma'
  },
  generator: [
    {
      name: 'client',
      provider: 'prisma-client-js'
    }
  ]
}).export(__dirname, 'schema')
