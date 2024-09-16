const request = require('supertest');
const http = require('http');
const { getAllBooks } = require('../controllers');
const { app } = require('../index.js');
const { describe, beforeEach } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllBooks: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controllers Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return All books', () => {
    let mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getAllBooks.mockReturnValue(mockBooks);
    let result = getAllBooks();
    expect(result).toEqual(mockBooks);
    expect(result.length).toBe(3);
  });
});

describe('API endpoint tests', () => {
  it('GET /books should get all books', async () => {
    const res = await request(server).get('/books');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
        },
        {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
        },
        {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
        },
      ],
    });
    expect(res.body.books.length).toBe(3);
  });
  it('GET /books/details/:id should get an employee by ID', async () => {
    const res = await request(server).get('/books/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    });
  });
});
