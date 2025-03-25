## Endpoint

```bash
http://localhost:3000/graphql
```

## Queries

### Get all service categories

```graphql
{
  serviceCategories(paginationQueryInput: { limit: 10 }) {
    id
    createdAt
    updatedAt
    title
    slug
    company {
      id
      title
    }
  }
}
```

### Get service category by ID

```graphql
query ($serviceCategoryId: String!) {
  serviceCategory(id: $serviceCategoryId) {
    id
    createdAt
    updatedAt
    title
    slug
    company {
      id
      title
    }
  }
}
```

## Mutations

### Create service category

```graphql
mutation {
  createServiceCategory(
    createServiceCategoryInput: {
      title: "Medycyna estetyczna"
      company: "a7839760-6e0d-4b02-8bce-db5cb6626a68"
    }
  ) {
    id
  }
}
```

### Edit service category

```graphql
mutation {
  updateServiceCategory(
    id: "11937b7d-c4c3-4be9-984b-f0d65cf4f079"
    updateServiceCategoryInput: { title: "Medycyna Estetyczna" }
  ) {
    ...fields
  }
}
```

### Delete service category

```graphql
mutation {
  removeServiceCategory(id: "1dc3407e-e9e5-4479-b5d4-9abed863dc1d")
}
```
