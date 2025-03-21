## Endpoint

```bash
http://localhost:3000/graphql
```

## Queries

### Get all users

```graphql
{
  users(paginationQueryInput: { limit: 10 }) {
    id
    email
    username
    firstName
    lastName
    status
    createdAt
    updatedAt
    companies {
      id
      title
    }
  }
}
```

### Get user by ID

```graphql
query ($userId: String!) {
  user(id: $userId) {
    ...fields
  }
}
```

### Get user by username

```graphql
query ($username: String!) {
  currentUser(username: $username) {
    ...fields
  }
}
```

## Mutations

### Create user

```graphql
mutation {
  createUser(
    createUserInput: {
      username: "john.doe"
      firstName: "John"
      lastName: "Doe"
      email: "john.doe@gmail.com"
      password: "examplePassword"
    }
  ) {
    ...fields
  }
}
```

### Login

```graphql
mutation {
  loginUser(
    loginUserInput: {
      email: "sample.email@domain.com"
      password: "examplePassword"
    }
  ) {
    token
  }
}
```

### Edit user

```graphql
mutation {
  updateUser(
    id: "5b36ff5f-069a-4d45-b316-167601f36550"
    updateUserInput: { username: "newUsername" }
  ) {
    ...fields
  }
}
```

### Delete user

```graphql
mutation {
  removeUser(id: "5b36ff5f-069a-4d45-b316-167601f36550")
}
```

### Change user status

```graphql
mutation {
  changeUserStatus(
    id: "5b36ff5f-069a-4d45-b316-167601f36550"
    updateStatusUserInput: { status: ACTIVE }
  ) {
    ...fields
  }
}
```

### Change user status

```graphql
mutation {
  changeUserRole(
    id: "5b36ff5f-069a-4d45-b316-167601f36550"
    updateRoleUserInput: { role: EMPLOYEE }
  ) {
    ...fields
  }
}
```
