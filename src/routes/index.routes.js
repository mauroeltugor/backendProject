const { Router } = require('express');
const assert = require('assert');
const pkg = require('../../package.json');
const router = Router();

assert.strictEqual(typeof pkg === 'object' && !Array.isArray(pkg), true, 'Package.json is not a JSON object');

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Products API",
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  });
});

module.exports = router;
