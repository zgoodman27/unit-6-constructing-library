// Your code goes here
//import library.js
const Library = require("./library.js");
//set up dotenv
const dotenv = require("dotenv");

//load env variables
dotenv.config();

//define local mongodb instance, database and collection
const db_url = "mongodb://localhost:27017";
const db_name = "library";
const collectionName = "books";

const collection = new Library(db_url, db_name, collectionName);

(async () => {
  await collection.test();

  //get all books from collection
  const allBooks = await collection.allBooks();
  await allBooks.forEach((book) => console.log("Books: ", book));

  //find one book by ID
  const id = allBooks.length > 0 ? allBooks[0]._id : null;
  if (id) {
    const findOneBook = await collection.findOneBook(id);
    console.log("Found this book by that ID: ", findOneBook);
  }

  //find all books by variable
  const findManyBooks = await collection.findBooks({
    author: "",
    Title: "",
    copies: "",
  });

  //create a new book
  const newBook = { title: "The Hobbit", author: "J.R.R. Tolkien", copies: 1 };
  await collection.addBook(newBook);
  console.log("Book added to the collection: ", newBook);

  await findManyBooks.forEach((book) => console.log(book));

  //change a book
  await collection.changeBook("688abba12b50dbd43a252fe7", { copies: 2 });

  //remove a book
  await collection.removeBook(id);
})();
