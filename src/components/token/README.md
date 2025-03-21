## Endpoint

```bash
http://localhost:3000/graphql
```

## Queries

### Get all tokens

```graphql
{
  tokens {
    id
    userId
    validTo
    type
    token
    createdAt
    updatedAt
  }
}
```

### Get token by ID

```graphql
query ($tokenId: String!) {
  token(id: $tokenId) {
    ...fields
  }
}
```

## Mutations

### Create token

```graphql
mutation {
  createToken(
    createTokenInput: {
      user: "764722e7-3286-4dc9-9aa4-dc6b7e9f54e0"
      token: "BW0gwQ1dE9CFdJvrcY77o7sH"
      type: "emailVerificationToken"
      validTo: "2025-12-31T00:00Z"
    }
  ) {
    ...fields
  }
}
```

### Edit token

```graphql
mutation {
  updateToken(
    id: "b15046be-1914-4acf-b25d-ed49be11e32c"
    updateTokenInput: { token: "BW0gwQ1dE9CFdJvrcY77o7sH" }
  ) {
    token
  }
}
```

### Delete token

```graphql
mutation {
  removeToken(id: "b15046be-1914-4acf-b25d-ed49be11e32c")
}
```
