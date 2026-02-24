const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => item.likes > favorite.likes ? item : favorite

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const authors = {}

  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
  })

  const reducer = (most, item) => item.blogs > most.blogs ? item : most

  return Object.keys(authors).map(author => {
    return {
      author,
      blogs: authors[author]
    }
  }).reduce(reducer)
}

mostLikes = (blogs) => {
  const authors = {}

  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })

  const reducer = (most, item) => item.likes > most.likes ? item : most

  return Object.keys(authors).map(author => {
    return {
      author,
      likes: authors[author]
    }
  }).reduce(reducer)
}

module.exports = {
  mostBlogs,
  dummy,
  totalLikes,
  mostLikes,
  favoriteBlog
}