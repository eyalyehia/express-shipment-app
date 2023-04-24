const express = require('express');
const router = express.Router();
const { authListOfUsers , authDeleteUsers , authUpdateUser , authGetSingleUser, authDeleteSingleUser } = require('../middlewere')


router.get("/",authListOfUsers);

router.get("/user/:id",authGetSingleUser);

router.delete("/",authDeleteUsers);

router.delete("/user/:id",authDeleteSingleUser);

router.put("/",authUpdateUser);

module.exports = router;