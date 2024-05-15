const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 2000;
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB Atlas
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hteerze.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb://localhost:27017/"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// verify token middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  // if token if not found
  if (!token) {
    console.log("no token available");
    return res.status(401).send({ message: "your token hanve not" });
  }
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    //if token is not valid
    if (err) {
      return res.status(401).send({ message: "token not correct or expired" });
    }

    //2. if success
    req.user = decoded;
    next();
  });
};

async function run() {
  try {

    // ==============================================
    //                    BOOK CRUD
    // ==============================================
    // make a database collection for books
    const bookCollection = client.db("booksDB").collection("books");

    // 1. MAKE A BOOK
    app.post("/books", async (req, res) => {
      const books = req.body;
      // store the data in collection
      const result = await bookCollection.insertOne(books);
      // return response
      res.send(result);
    });

    // 2. GET ALL BOOK INFO
    app.get("/books", async (req, res) => {
      const books = await bookCollection.find().toArray();
      res.send(books);
    });

    // 3. GET SINGLE BOOK
    app.get("/book/:id", async (req, res) => {
      // get the id
      const id = req.params.id;
      // query for user that has id = _id
      const query = { _id: new ObjectId(id) };
      // execute  query
      const result = await bookCollection.findOne(query);
      // serve the data
      res.send(result);
    });

    // 4. UPDATE BOOK
    app.put("/book/:id", async (req, res) => {
      const id = req.params.id;
      const book = req.body;

      // filter for the product with id
      const filter = { _id: new ObjectId(id) };
      // create product data if id not matching
      const options = { upsert: true };
      // update the product data
      const updateProduct = {
        $set: {
          name: book.name,
          image: book.image,
          authorName: book.authorName,
          category: book.category,
          quantity: book.quantity,
          shortDescription: book.shortDescription,
          rating: book.rating,
        },
      };

      // update the data
      const result = await bookCollection.updateOne(
        filter,
        updateProduct,
        options
      );
      // serve the data
      res.send(result);
    });

    // 5. DELETE BOOK
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      // filter for the product with id
      const query = { _id: new ObjectId(id) };
      const result = await bookCollection.deleteOne(query);
      res.send(result);
    });


    // ==============================================
    //                    CATEGORY CRUD
    // ==============================================
    // make a database collection for Category
    const categoryCollection = client.db("booksDB").collection("categoris");

    // 1. MAKE A CATEGORY
    app.post("/category", async (req, res) => {
      const category = req.body;
      // store the data in collection
      const result = await categoryCollection.insertOne(category);
      // return response
      res.send(result);
    });

    // 2. GET ALL CATEGORY INFO
    app.get("/categories", async (req, res) => {
      const categories = await categoryCollection.find().toArray();
      res.send(categories);
    });

    // 3. GET SINGLE CATEGORY
    app.get("/category/:id", async (req, res) => {
      // get the id
      const id = req.params.id;
      // query for  category
      const query = { _id: new ObjectId(id) };
      // execute  query
      const result = await categoryCollection.findOne(query);
      // serve the data
      res.send(result);
    });

    // 4. UPDATE CATEGORY
    app.put("/category/:id", async (req, res) => {
      const id = req.params.id;
      const category = req.body;

      // filter for the product with id
      const filter = { _id: new ObjectId(id) };
      // create product data if id not matching
      const options = { upsert: true };
      // update the product data
      const updateCategory = {
        $set: {
          name: category.name,
          categoryName: category.categoryName,
        },
      };
      // update the data
      const result = await categoryCollection.updateOne(
        filter,
        updateCategory,
        options
      );
      // serve the data
      res.send(result);
    });

    // 5. DELETE CATEGORY
    app.delete("/category/:id", async (req, res) => {
      const id = req.params.id;
      // filter for the product with id
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.deleteOne(query);
      res.send(result);
    });

    // 6. BOOK SHOWING ACCORDING CATEGORY
    app.get("/books/:category", async (req, res) => {
      try {
        // get the type
        const category = req.params.category.replace(/-/g, " ");
        // query for type that have type = categoryType
        const query = { category: category };
        // cursor query
        const cursor = bookCollection.find(query);
        // exicute the query
        const result = await cursor.toArray();
        // serve the data
        res.send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    });

    // ==============================================
    //                      USER BORROWED
    // ==============================================

    // make a database collection for usrs
    const borrowedCollection = client.db("booksDB").collection("borrowed");

    // 1. MAKE A BORROW
    app.post("/addToBorrow/:email/:bookId", async (req, res) => {
      const borrow = req.body;
      const email = req.params.email;
      const bookId = req.params.bookId;

      // user exist
      const isBorrowExist = await borrowedCollection.findOne({
        bookId: bookId,
        email: email,
      });

      if (isBorrowExist) {
        console.log(`the is already borrowd is already exist`);
        return res.status(409).send("user already exist");
      }

      const updatedBook = await bookCollection.findOneAndUpdate(
        { _id: new ObjectId(bookId) },
        { $inc: { quantity: -1 } }, // Decrement quantity by 1
        { returnOriginal: false }
      );

      if (updatedBook) {
        console.log(`Book quantity updated successfully.`);
      }

      // store the data in collection
      const result = await borrowedCollection.insertOne(borrow);
      console.log(`book borrowd successfully done`);

      // // // return borrow
      res.send(result);
    });

    // 2. GET ALL BORROW INFO
    app.get("/borrlowed", verifyToken, async (req, res) => {
      // if token email is NOT correct with request query email
      if (req.query.email !== req.user.email) {
        return res.status(403).send({ message: "forbidden" });
      }

      // is the query email and token email is same
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }

      // console.log('user token ===> ', req.cookies.token);
      const borrowed = await borrowedCollection.find(query).toArray();
      res.send(borrowed);
    });

    // 3. DELETE CATEGORY
    app.delete("/borrowed/:bookdId/:id", async (req, res) => {
      // borrowed book id
      const borrowid = req.params.id;

      // book collection id
      const bookdId = req.params.bookdId;
      console.log("the bookId==>", bookdId, "the id==>", borrowid);

      // increse the book quantity
      const updatedBook = await bookCollection.findOneAndUpdate(
        { _id: new ObjectId(bookdId) },
        { $inc: { quantity: 1 } }, // Increment quantity by 1
        { returnOriginal: false }
      );

      // fi booked update
      if (!updatedBook) {
        res.status(500).send({ message: "internal server error" });
      }

      // filter for the product with id
      const query = { _id: new ObjectId(borrowid) };
      const result = await borrowedCollection.deleteOne(query);
      res.send(result);
    });

    // ==============================================
    //                  USER AUTH
    // ==============================================
    // make a database collection for usrs
    const userCollection = client.db("booksDB").collection("users");

    // users SIGN UP
    app.post("/users", async (req, res) => {
      // get data from client
      const user = req.body;
      // console.log(user);

      // user exist
      const userExist = await userCollection.findOne({ email: user.email });

      if (userExist) {
        console.log(`the ${user.email} is already exist`);
        return res.send("user already exist");
      }
      // insert data into db
      const result = await userCollection.insertOne(user);
      console.log(`successfully save the user ${user.name}`);
      res.send(result);
    });

    // 2. GET ALL users
    app.get("/users", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // jwt token generate and stored in cookie
    app.post("/jwtToken", async (req, res) => {
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
        })
        .send({ success: true });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// make a base route for tesinting
app.get("/", (req, res) => {
  res.send(`The server is running `);
});
// run the server thrught listner
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
