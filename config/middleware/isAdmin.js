//restring routes a user is not allowed to visit if not enum "admin"
module.exports = function (req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user.role === "admin") {
    return next();
  }

  return res.redirect("/");
};
