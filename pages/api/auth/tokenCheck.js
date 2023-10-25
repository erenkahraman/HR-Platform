import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const token = req.body.token;
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = true;
    res.status(200).json({ message: "true", data });
  } catch (error) {
    const data = false;
    console.log(error);
    //res.status(404).json({ message: "Unidentified User" });
    res.status(404).json({ message: "Unidentified User", data });
    return false;
  }
};
function tokenCheckFunction(token) {
  try {
    console.log("LOGFORTEST - TOKEN check function, before decoding.");
    console.log(process.env.JWT_SECRET);
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("LOGFORTEST - Inside token check function.");
    console.log(decoded);
    return true;
  } catch (error) {
    console.log("LOGFORTEST - Function failed for some reason.");
    throw new Error(error);
  }
}

module.exports.tokenCheckFunction = tokenCheckFunction;

