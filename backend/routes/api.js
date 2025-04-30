const express = require('express');
const passport = require('passport');
const { Genre } = require('../models');

const router = express.Router();

router.get("/me", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});

router.get("/genre/all", async (req, res) => {
    try {
        let genre = await Genre.findAll({
            attributes: ['id', 'name']
        });

        if(!genre.length) {
            throw new Error('No genres found');
        }
        res.json(genre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports.router = router;