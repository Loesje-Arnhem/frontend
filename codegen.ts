import { CodegenConfig } from '@graphql-codegen/cli'
import { apiUrl } from './data/siteDetails'

const config: CodegenConfig = {
  schema: `${apiUrl}graphql`,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['graphql2/**/*.ts'],
  generates: {
    './graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false, // HERE
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
