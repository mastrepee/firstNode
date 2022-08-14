const express = require('express');
const router = express.Router();

const News = require("../models/News");

// 1. Save News
router.post("/save", (req,res) => {
    const newNews = new News({
        headline: req.body.headline,
        description: req.body.description,
        department: req.body.department,
        imageUrl: req.body.imageUrl,
    });
    newNews
        .save()
        .then((news) => res.json(news))
        .catch((err) => res.json(err));        
});

// 2. Get All News
router.get("/get-all", (req,res) => {
    News.find()
        .then((news) => res.json(news))
        .catch((err) => res.status(404).json({ noNewsFound: "No News Found" }));
});

// 3. Get News By Id
router.get("/get/:id", (req, res) => {
    News.findById(req.params.id)
        .then((news) => res.json(news))
        .catch((err) => 
            res.status(404).json({ noNewsFound: "No News Found" })
        );
});  

// 4. Get News By Dept
router.post("/get-by-dept", (req, res) => {
    var dept = req.body.department;
    News.find({department: dept})
        .then((news) => res.json(news))
        .catch((err) => res.status(404).json({ noNewsFound: "No News Found" }));
});  

// 5 Edit Notice
router.post("/edit/:id", (req, res) => {
    var newData = {
        headline: req.body.headline,
        description: req.body.description,
        department: req.body.department,
        imageUrl: req.body.imageUrl, 
    };
News.findOneAndUpdate(
    { _id: req.params.id },
    { $set: newData },
    { new: true }
)
    .then((news) => res.json(news))
    .catch((err) => console.log(err));
});

// 6. Delete News By Id
router.delete("/delete-all", (req, res) => {
    News.deleteMany()
        .then((data) => res.send({ success: true }))
        .catch((err) => res.statusa(404).json({ success: false }));
});

module.exports = router;