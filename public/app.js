$(function() {
    $("submit").on("click", function(event) {
        event.preventDefault();

        $("scrapedBody").empty();
        $.ajax("api/all", {type: "GET"})
        .then(function(response) {
            let oldScrape = response; console.log(oldScrape);
        
        $.ajax("/api/scrape", {type: "POST"})
        .then(function(response) {
        $.ajax("/api/reduce", {type: "DELETE"})
        .then(function(response) {
            let texts = $("<div>");
            let newScrape = response.length; console.log(newScrape);

            let body = parent(newScrape) - parent(oldScrape);

            if(body == 0) {
                texts.text("Scrape Is Completed!")
                $("scrapedBody").append(newScrape)
                $("#scrapeArticlesModal").modal("show");
            } else {
                texts.text(body + "New Article!")
                $("scrapedBody").append(texts)
                $("#scrapeArticlesModal").modal("show");
            }
        })
        })
        })
    });
})





// const express = require("express");
// const cheerio = require("cheerio");
// const axios = require("axios"); 


// const webScraping = function() {
//     app.get("/scrape", function(response) {
//         axios.get("https://www.thescore.com/").then(function(req, res) {
//             var $ = cheerio.load(response.date);
//             $("").each(function(i, element) {
//                 var results = [];
                
//             });
//         });
//     });
// }