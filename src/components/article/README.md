## Endpoint

```bash
http://localhost:3000/graphql
```

## Queries

### Get all articles

```graphql
{
  articles(paginationQueryInput: { limit: 10 }) {
    id
    createdAt
    updatedAt
    title
    slug
    content
    recommendations
    author {
      id
      username
      firstName
      lastName
    }
    comments {
      id
      createdAt
      updatedAt
      content
      author {
        id
        username
        firstName
        lastName
      }
    }
    tags {
      id
      title
    }
    photos {
      id
    }
  }
}
```

### Get article by ID

```graphql
query ($articleId: String!) {
  article(id: $articleId) {
    id
    createdAt
    updatedAt
    title
    slug
    content
    recommendations
    author {
      id
      username
      firstName
      lastName
    }
    comments {
      id
      createdAt
      updatedAt
      content
      author {
        id
        username
        firstName
        lastName
      }
    }
    tags {
      id
      title
    }
    photos {
      id
    }
  }
}
```

## Mutations

### Create article

```graphql
mutation {
  createArticle(
    createArticleInput: {
      title: "Article title"
      content: "Content of the article"
      author: "5b36ff5f-069a-4d45-b316-167601f36550"
      tags: ["tag1", "tag2"]
    }
  ) {
    id
    ...fields
  }
}
```

### Edit article

```graphql
mutation {
  updateArticle(
    id: "c0b0fe53-6ab7-4dec-a8fa-abd501c97cd0"
    updateArticleInput: { title: "New article title", tags: ["tag3", "tag4"] }
  ) {
    id
    title
    ...fields
  }
}
```

### Delete article

```graphql
mutation {
  removeArticle(id: "c0b0fe53-6ab7-4dec-a8fa-abd501c97cd0")
}
```
