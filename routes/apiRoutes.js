const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios"); 
const db = require("../models");

module.exports = function(app) {

    app.get("/api/all", function(req, res) {
        db.Article.find({$query: {save: false} }).sort({ date: -1 })
        .then(function(response) {
            res.json(response.length)
        })
    });

    app.get("/api/notes/all", function(req, res) {
        db.Note.find({})
        .then(function(response) {
            res.json(response)
        })
    });

    app.post("/api/scrape", function() {
        request("https://www.bbc.com/news/world/africa", function(response, html) {
            const $ = cheerio.load(html);
            console.log($("a").length);
            console.log($("h3.title").length);
            console.log($("img").length);
            console.log($("p").length);
            console.log(".column--primary");

            $(".column--primary").each(function(i, element) {
                let headline = $(element).find("h3").find(".title").text();
                let urlLink = $(element).find("a").children().attr("href");
                let image = $(element).find("img").children().attr("src");
                let summary = $(element).find("p").text();
                let scrapeItem = {
                    headline: headline,
                    urlLink: urlLink,
                    image: image,
                    summary: summary
                }

                db.Article.create(scrapeItem, function(err) {
                    if(err) console.log("Scrape another Article" + scrapeItem.headline);
                    else {console.log("Updated Article" + scrapeItem.headline);}
                    if(i == ($(".column--primary").length - 1)) {
                        res.json("Completed")
                    }
                })

            });
        })
    });
}

// app.post("/api/all", function(req, res) {
//     db.Article.find({$query: {saved: false}}).sort({date: -1})
//     .then(function(dbArticle) {
//         res.json(dbArticle);
//     })
//     .catch(function(err) {
//         res.json(err);
//     });
// });


// app.post("/api/note/all", function(req, res) {
//     db.Notes.find({})
//     .then(function(dbArticle) {
//         res.json(dbArticle);
//     })
//     .catch(function(err) {
//         res.json(err)
//     })
// });




//     app.po("api/scrape", function(req, res) {
//         axios.get("https://www.bbc.com/news").then(function(response) {
//             const $ = cheerio.load(response.data);
//             $("article h3").each(function(i, element) {
//                 var results = {};
//                 results.headline = $(this).children("h3").text();
//                 results.urlLink = $(this).children("a").attr("href");
//                 results.imgae = $(this).children("img").attr("src");
//                 results.summary = $(this).children("p").text();

//                 db.Article.create(results)
//                 .then(function(dbArticle) {
//                     console.log(dbArticle);
//                 }).catch(function(err) {
//                     console.log(err);
//                 });
//                     });
//                     res.send("Completed!");
//                 });
//             });
// }







