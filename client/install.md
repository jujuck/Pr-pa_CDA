## Step to initialize

- npm i @graphql-codegen/cli
    @graphql-codegen/typescript-graphql-request
    @graphql-codegen/typescript-operations
    @graphql-codegen/typescript-react-apollo
- script in package.json
- folder schema with
  - query
  - mutation
- create a codegen.ts config file
  - in the generate part => plugins: [
    "typescript",
    "typescript-operations",
    "typescript-react-apollo",
    ],
    config: {
    withHooks: true,
    },
