const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());  // Enable CORS to allow frontend requests

const API_KEY = "ba8186f17c2b4545869eebe25700a2db";

app.get("/get-news", async (req, res) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
