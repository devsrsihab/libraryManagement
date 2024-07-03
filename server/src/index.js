import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import trimValues from "./utils/trimeReqBodyData.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

// Middleware setup
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB Atlas connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hteerze.mongodb.net`;

// Create a MongoClient with specific options
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: "1",
  },
});

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token or expired" });
  }
};

// Asynchronous function to run the server
async function run() {
  try {
    await client.connect();

    // ==============================================
    //                    BOOK CRUD
    // ==============================================

    const bookCollection = client.db("booksDB").collection("books");

    // 1. CREATE A BOOK
    app.post("/books", async (req, res) => {
      const book = req.body;
      trimValues(book);
      const result = await bookCollection.insertOne(book);
      res.send(result);
    });

    // 2. GET ALL BOOKS
    app.get("/books", async (req, res) => {
      const books = await bookCollection.find().toArray();
      res.send(books);
    });

    // 3. GET SINGLE BOOK BY ID
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const book = await bookCollection.findOne(query);
      res.send(book);
    });

    // 4. UPDATE BOOK
    app.put("/book/:id", async (req, res) => {
      const id = req.params.id;
      const book = req.body;
      trimValues(book);

      const filter = { _id: new ObjectId(id) };
      const updateBook = {
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

      const result = await bookCollection.updateOne(filter, updateBook);
      res.send(result);
    });

    // 5. DELETE BOOK
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookCollection.deleteOne(query);
      res.send(result);
    });

    // ==============================================
    //                    CATEGORY CRUD
    // ==============================================

    const categoryCollection = client.db("booksDB").collection("categoris");

    // 1. CREATE A CATEGORY
    app.post("/category", async (req, res) => {
      const category = req.body;
      trimValues(category);
      const result = await categoryCollection.insertOne(category);
      res.send(result);
    });

    // 2. GET ALL CATEGORIES
    app.get("/categories", async (req, res) => {
      const categories = await categoryCollection.find().toArray();
      res.send(categories);
    });

    // 3. GET SINGLE CATEGORY BY ID
    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const category = await categoryCollection.findOne(query);
      res.send(category);
    });

    // 4. UPDATE CATEGORY
    app.put("/category/:id", async (req, res) => {
      const id = req.params.id;
      const category = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateCategory = {
        $set: {
          categoryName: category.categoryName,
          image: category.image,
        },
      };

      const result = await categoryCollection.updateOne(filter, updateCategory);
      res.send(result);
    });

    // 5. DELETE CATEGORY
    app.delete("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.deleteOne(query);
      res.send(result);
    });

    // 6. GET BOOKS BY CATEGORY
    app.get("/books/:category", async (req, res) => {
      try {
        const category = req.params.category.replace(/-/g, " ");
        const query = { category };
        const books = await bookCollection.find(query).toArray();
        res.send(books);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    // ==============================================
    //                    USER BORROWED
    // ==============================================

    const borrowedCollection = client.db("booksDB").collection("borrowed");

    // 1. ADD TO BORROWED
    app.post("/addToBorrow/:email/:bookId", async (req, res) => {
      const { email, bookId } = req.params;
      const borrow = req.body;

      const isBorrowExist = await borrowedCollection.findOne({
        bookId,
        email,
      });

      if (isBorrowExist) {
        return res.status(409).send("User already borrowed this book");
      }

      const updatedBook = await bookCollection.findOneAndUpdate(
        { _id: new ObjectId(bookId) },
        { $inc: { quantity: -1 } }, // Decrement quantity by 1
        { returnOriginal: false }
      );

      if (!updatedBook) {
        return res.status(404).send("Book not found");
      }

      const result = await borrowedCollection.insertOne(borrow);
      res.send(result);
    });

    // 2. GET ALL BORROWED
    app.get("/borrowed", verifyToken, async (req, res) => {
      if (req.query.email !== req.user.email) {
        return res.status(403).send({ message: "Forbidden" });
      }

      const query = req.query.email ? { email: req.query.email } : {};
      const borrowed = await borrowedCollection.find(query).toArray();
      res.send(borrowed);
    });

    // 3. DELETE BORROWED
    app.delete("/borrowed/:bookId/:id", async (req, res) => {
      const { bookId, id } = req.params;

      const updatedBook = await bookCollection.findOneAndUpdate(
        { _id: new ObjectId(bookId) },
        { $inc: { quantity: 1 } }, // Increment quantity by 1
        { returnOriginal: false }
      );

      if (!updatedBook.value) {
        return res.status(404).send("Book not found");
      }

      const query = { _id: new ObjectId(id) };
      const result = await borrowedCollection.deleteOne(query);
      res.send(result);
    });

    // ==============================================
    //                    USER AUTH
    // ==============================================

    const userCollection = client.db("booksDB").collection("users");

    // 1. USER SIGN UP
    app.post("/users", async (req, res) => {
      const user = req.body;

      const userExist = await userCollection.findOne({ email: user.email });

      if (userExist) {
        return res.status(409).send("User already exists");
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // 2. GET ALL USERS
    app.get("/users", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // 3. GENERATE JWT TOKEN AND STORE IN COOKIE
    app.post("/jwtToken", async (req, res) => {
      const user = req.body;
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

    // Base route for testing
    app.get("/", (req, res) => {
      res.send(`Server is running`);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Run the server
run().catch(console.error);
