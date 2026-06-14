import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import Tweet from "./models/tweet.js";
dotenv.config();
console.log("ENV FILE URL:", process.env.MONGO_URL);
const app = express();
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Twiller backend is running successfully");
});

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
console.log("MONGO URL =", process.env.MONGO_URL);


  mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Register
app.post("/register", async (req, res) => {
  console.log("REGISTER REQUEST:", req.body);

  try {
    const existinguser = await User.findOne({ email: req.body.email });

    if (existinguser) {
      console.log("User already exists:", existinguser);
      return res.status(200).send(existinguser);
    }

    const newUser = new User(req.body);
    await newUser.save();

    console.log("New user created:", newUser);

    return res.status(201).send(newUser);
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(400).send({ error: error.message });
  }
});
// loggedinuser
app.get("/loggedinuser", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).send({ error: "Email missing" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
app.patch("/userupdate/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const updated = await User.findOneAndUpdate(
      { email },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).send(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(400).send({ error: error.message });
  }
});
// update Profile
app.get("/loggedinuser", async (req, res) => {
  console.log("🔥 loggedinuser HIT");

  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email missing" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(user);
});
// Tweet API

// POST
app.post("/post", async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    await tweet.save();
    return res.status(201).send(tweet);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
// get all tweet
app.get("/post", async (req, res) => {
  try {
    const tweet = await Tweet.find().sort({ timestamp: -1 }).populate("author");
    return res.status(200).send(tweet);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
//  LIKE TWEET
app.post("/like/:tweetid", async (req, res) => {
  try {
    const { userId } = req.body;
    const tweet = await Tweet.findById(req.params.tweetid);
    if (!tweet.likedBy.includes(userId)) {
      tweet.likes += 1;
      tweet.likedBy.push(userId);
      await tweet.save();
    }
    res.send(tweet);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
// retweet 
app.post("/retweet/:tweetid", async (req, res) => {
  try {
    const { userId } = req.body;
    const tweet = await Tweet.findById(req.params.tweetid);
    if (!tweet.retweetedBy.includes(userId)) {
      tweet.retweets += 1;
      tweet.retweetedBy.push(userId);
      await tweet.save();
    }
    res.send(tweet);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});