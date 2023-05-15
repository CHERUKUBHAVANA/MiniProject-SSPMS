const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const app = express();
admin.initializeApp();

const db = admin.firestore();

// API endpoint to get a user's information
app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const userRef = db.collection('students').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    res.status(404).send('User not found.');
  } else {
    const userData = doc.data();
    res.send(userData);
  }
});

exports.api = functions.https.onRequest(app);
