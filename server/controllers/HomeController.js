module.exports = class HomeController {
  static async Home(req, res, next) {
    try {
      res.status(200).json({ message: "Hello World" });
    } catch (error) {
      console.log(error);
    }
  }
};
