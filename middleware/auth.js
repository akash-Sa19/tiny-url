const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  // previously using
  // const userUid = req.cookies?.uid;
  // if (!userUid) return res.redirect("/login");
  // const user = getUser(userUid);
  // if (!user) return res.redirect("/login");
  // req.user = user;
  // next();

  // using headers to auth using Bearer token
  const userUid = req.headers["authorization"];
  if (!userUid) return res.redirect("/login");
  const token = userUid.split(" ")[1];
  // const token = userUid.split("Bearer ")[1];

  const user = getUser(token);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
