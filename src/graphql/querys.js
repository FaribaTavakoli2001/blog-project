import { gql, useQuery } from '@apollo/client'



const GET_BLOGS_INFO = gql `
query {
    posts {
      authors {
        name
        avatar {
          url
        }
      }
      title
      slug
      id
      coverPhoto {
        url
      }
    }
  } 
`
const GET_AUTHORS_INFO = gql `
query {
  authors {
    name
    slug
    id
    avatar {
      url
    }
  }
}
`

const GET_AUTHOR_INFO = gql `
query getAuthorInfo($slug: String!) {
  author(where: {slug: $slug}) {
    avatar {
      url
    }
    field
    name
    description {
      html
    }
    posts {
      coverPhoto {
        url
      }
      id
      slug
      title
    }
  }
}
`

const GET_BLOG_INFO = gql `
query getPost($slug: String!) {
  post(where: {slug: $slug}) {
    authors {
      avatar {
        url
      }
      name
      field
    }
    content {
      html
    }
    coverPhoto {
      url
    }
    title
  }
}
`
const GET_POST_COMMENT = gql `
query getPostComments($slug: String!){
  comments(where: {post: {slug: $slug}}) {
    id
    text
    name
  }
}
`

export {GET_BLOGS_INFO , 
  GET_BLOG_INFO , 
  GET_AUTHORS_INFO , 
  GET_AUTHOR_INFO ,
  GET_POST_COMMENT }