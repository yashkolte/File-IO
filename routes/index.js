const { render } = require("ejs");
var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "File I/O" });
});

router.get("/createFile", function (req, res) {
  fs.writeFile(`./upload/${req.query.fileName}`, "", function (err) {
    if (err) throw err;
    else res.redirect("/");
  });
});

router.get("/deleteFile", function (req, res) {
  fs.unlinkSync(`./upload/${req.query.fileDeleteName}`, function (err) {
    if (err) throw err;
    else res.redirect("/");
  });
});

router.get("/readFile", function (req, res, next) {
  fs.readFile(
    `./upload/${req.query.fileReadName}`,
    "utf8",
    function (err, data) {
      if (err) {
        next(err); // Pass errors to Express.
      } else {
        res.send({ data: data });
      }
    }
  );
});

router.get("/writeFile", function (req, res) {
  fs.writeFile(
    `./upload/${req.query.fileWriteName}`,
    `${req.query.writeText}`,
    { encoding: "utf8", flag: "w" },
    function (err) {
      if (err) throw err;
      else res.redirect("/");
    }
  );
});

router.get('/about', function (req, res ){
  res.render('about', { title: 'About' });
  });

module.exports = router;
