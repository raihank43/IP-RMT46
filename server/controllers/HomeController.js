module.exports = class HomeController {
  static async Home(req, res, next) {
    res.status(200).json({ message: "Welcome to KoneksiON API" });
  }
};
