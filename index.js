const express = require("express");
const path = require("node:path");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
const app = express();
const PORT = 8001;

// database connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("database connection problem -> ", err));

// middleware
app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
// this checkAuth middleware is not working with stateless authentication
app.use("/", checkAuth, staticRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

// app.get("/url/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     {
//       shortId,
//     },
//     {
//       $push: {
//         visitHistory: {
//           timestamp: Date.now(),
//         },
//       },
//     }
//   );
//   res.redirect(entry.redirectURL);
// });

app.get("/test", async (req, res) => {
  const allUrl = await URL.find({});
  // we can also pass data with render method
  return res.render("home", {
    urls: allUrl,
  });
  // return res.end(
  //   `<html>
  //     <head></head>
  //     <body>
  //       <h1>Url list</h1>
  //       <ol>
  //         ${allUrl
  //           .map(
  //             (url) =>
  //               `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`
  //           )
  //           }
  //       </ol>
  //     </body>
  //   </html>`
  // );
});

// port
app.listen(PORT, () => console.log(`http://localhost:8001`));
