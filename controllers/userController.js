const { User, Video } = require('../models')
const Joi = require('joi');
const { Op, INTEGER } = require('sequelize')
const _ = require('lodash')
const bcrypt = require("bcrypt");
const PG = require('../utils/paginate')

module.exports.create = async (req, res) => {
    try {
        const { username, password, full_name } = req.body
        const validator = await userValidator(req.body)
        if (validator.error) {
            let message = validator.error.details.map(err => err.message);
            res.status(400).send(message)
        }
        let hashPassword = await bcrypt.hash(password.toString(), await bcrypt.genSalt(10))
        const user = await User.create({
            username,
            password: hashPassword,
            full_name
        })
        res.status(201).send({
            message: "Foydalanuvchi yaratildi",
            object: user
        })
    } catch (error) {
        res.status(409).json(error.message)
    }
}

userValidator = async (fields) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        full_name: Joi.string().required(),
        })
    const Validation = await schema.validate(fields);
    return Validation;
}


module.exports.index = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
              }
        });
        req.data = users
        res.status(200).send(PG.paginate(req))
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports.videos = async (req, res) => {
    try {
        const videos = await Video.findByPk(req.params.id);
        req.data = videos
        res.status(200).send(videos)
    } catch (error) {
        res.status(400).send(error.message)
    }
}