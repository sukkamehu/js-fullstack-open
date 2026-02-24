const assert = require('node:assert')
const { test, before, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const path = require('node:path')
require('dotenv').config()
const supertest = require('supertest')

process.env.SECRET = process.env.SECRET || 'testsecret'

let api
let Blog
let User
let token

before(async () => {
  // Connect to DB defined in ../osa3/osa3_3/.env
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  Blog = require('../models/blog')
  User = require('../models/user')
  const app = require('../app')
  api = supertest(app)
})

const initialBlogs = [
  { title: 'First blog', author: 'Alice', url: 'http://example.com/1', likes: 1 },
  { title: 'Second blog', author: 'Bob', url: 'http://example.com/2', likes: 2 }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await require('bcrypt').hash('password', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' })

  token = loginResponse.body.token

  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json and correct amount', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('returned blog objects contain `id` field and not `_id`', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  const blog = response.body[0]
  assert.strictEqual(typeof blog.id, 'string')
  assert.strictEqual(blog._id, undefined)
})

test('adding a new blog increases count and stores content', async () => {
  const newBlog = {
    title: 'New blog post',
    author: 'Carol',
    url: 'http://example.com/new',
    likes: 5,
  }

  // POST the new blog
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Verify count increased by 1
  const allResponse = await api.get('/api/blogs')
  assert.strictEqual(allResponse.body.length, initialBlogs.length + 1)

  // Verify content exists
  const titles = allResponse.body.map(b => b.title)
  assert.strictEqual(titles.includes('New blog post'), true)
})

test('deleting a blog by id removes it and reduces count', async () => {
  // get current blogs
  const getRes = await api.get('/api/blogs')
  const initialCount = getRes.body.length
  const blogToDelete = getRes.body[0]

  // delete the first blog
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  // verify count decreased by 1
  const afterRes = await api.get('/api/blogs')
  assert.strictEqual(afterRes.body.length, initialCount - 1)

  // verify deleted blog not present
  const titles = afterRes.body.map(b => b.title)
  assert.strictEqual(titles.includes(blogToDelete.title), false)
})

after(async () => {
  await mongoose.connection.close()
})
