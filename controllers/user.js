const User = require("../models/user");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or password",
    });
  }
  // statefull auth
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);

  // stateless auth
  // const token = setUser(user);
  // res.cookie("uid", token);
  // return res.redirect("/");

  // using headers to auth using Bearer token
  const token = setUser(user);
  return res.json({ token });
}

module.exports = { handleUserSignup, handleUserLogin };
