const { pool } = require('./db');
var nodemailer = require('nodemailer');
const authkeys = require('../config/authKeys');


const getUsers = (request, response) => {
    pool.query('SELECT * FROM "awt"."Users" ORDER BY "UserID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "awt"."Users" WHERE "UserID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const userLogin = (request, response) => {
    const { UserEmail, UserPassword } = request.body
    pool.query('SELECT * FROM "awt"."Users" WHERE "UserEmail" = $1 and "UserPassword"= $2',
        [UserEmail, UserPassword],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const createUser = (request, response) => {
    const { email, password, usertype } = request.body

    pool.query('INSERT INTO "awt"."Users" ("UserEmail", "UserPassword", "UserType") VALUES ($1, $2, $3) RETURNING *',
        [email, password, usertype], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).json(result.rows[0])
        })
}


const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { email, password } = request.body

    pool.query(
        'UPDATE "awt"."Users" SET "UserEmail" = $1, "UserPassword" = $2 WHERE "UserID" = $3 ',
        [email, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows[0])
        }
    )
}


const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "awt"."Users" WHERE "ProjectId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}

const findOne = (useremail, password, cb) => {

    pool.query('SELECT * FROM "awt"."Users" WHERE "UserEmail" = $1  and "UserPassword"= $2', [useremail, password],
        (error, results) => {
            if (!error && results.rowCount > 0) {
                cb(null, results.rows[0]);

            }
            else {
                cb(error, null);
            }
        });
}




const sendEmail = (request, response) => {

    const { email, subject, message } = request.body

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: authkeys.gmailLogin.user,
            pass: authkeys.gmailLogin.pass
        }
    });

    var mailOptions = {
        from: authkeys.gmailLogin.user,
        to: email,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            response.status(500).json(error);
        } else {
            response.status(200).json('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    userLogin,
    findOne,
    sendEmail
}