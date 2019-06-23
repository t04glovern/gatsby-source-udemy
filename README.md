# gatsby-source-udemy

Source plugin for pulling data into Gatsby from an unofficial Udemy JSON
endpoint.

## Install

`npm install --save gatsby-source-udemy`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-udemy`,
    options: {
      courses: [
        '2057215',
        '1672824',
        '1627276',
        '1572194',
      ],
    },
  },
]
```

### Options

#### Courses

Array of course numbers taken from the URL of the Udemy course. Example:

```bash
https://www.udemy.com/instructor/course/2057215
```

## How to query

Get all courses defined

```graphql
query UdemyCourseQuery {
  allUdemyCourse {
    edges {
      node {
        id
        title
        url
        price
        image_480x270
      }
    }
  }
}
```
