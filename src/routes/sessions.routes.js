const { Router } = require('express');
const passport = require('../config/passport');

const router = Router();

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
