## Endpoint

```bash
http://localhost:3000/graphql
```

## Queries

### Get all companies

```graphql
{
  companies(paginationQueryInput: { limit: 10 }) {
    id
    title
    createdAt
    updatedAt
    employees {
      id
      username
      firstName
      lastName
      email
    }
  }
}
```

### Get company by ID

```graphql
query ($companyId: String!) {
  company(id: $companyId) {
    id
    title
    employees {
      id
      username
      firstName
      lastName
      email
    }
  }
}
```

## Mutations

### Create company

```graphql
mutation {
  createCompany(
    createCompanyInput: {
      title: "Microsoft Corporation"
      content: "Software company from United States of America"
      owner: "5b36ff5f-069a-4d45-b316-167601f36550"
      employeeIds: [
        "5b36ff5f-069a-4d45-b316-167601f36550"
        "15d4c23a-f4bf-4d8e-80be-6d1c057e382a"
      ]
    }
  ) {
    id
    title
    ...fields
    employees {
      id
      username
      ...fields
    }
  }
}
```

### Edit comapny

```graphql
mutation {
  updateCompany(
    id: "a7839760-6e0d-4b02-8bce-db5cb6626a68"
    updateCompanyInput: { title: "Sony" }
  ) {
    id
    title
    createdAt
    updatedAt
  }
}
```

### Delete company

```graphql
mutation {
  removeCompany(id: "1dc3407e-e9e5-4479-b5d4-9abed863dc1d")
}
```
