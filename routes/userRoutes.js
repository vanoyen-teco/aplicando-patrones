const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/:id', userController.getUser);

module.exports = router;