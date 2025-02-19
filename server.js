const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const serviceAccount = require("./firebase_admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to Verify Firebase Token
const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Store user info in request
    next(); // Proceed to API route
  } catch (error) {
    res.status(403).json({ message: "Invalid token", error });
  }
};

app.get("/protected", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Secure data accessed ", user: req.user });
});

console.log("Process", port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
