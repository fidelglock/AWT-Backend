const { pool } = require('./db');

const getCategory = (request, response) => {
    pool.query('SELECT * FROM "awt"."Category"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCategoryById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "awt"."Category" WHERE "categoryId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createCategory = (request, response) => {
    const { shortname, longname } = request.body

    pool.query('INSERT INTO "awt"."Category" ("ShortName", "LongName") VALUES ($1, $2) RETURNING *',
        [shortname, longname], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).json(result.rows[0]);
        });
}


const updateCategory = (request, response) => {
    const id = parseInt(request.params.id)
    const { shortname, longname } = request.body

    pool.query(
        'UPDATE "Category" SET "ShortName" = $1, "LongName" = $2 WHERE "categoryId" = $3 RETURNING "categoryId"',
        [shortname, longname, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Project modified with ID: ${results.rows[0].categoryId}`)
        }
    )
}


const deleteCategory = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "Category" WHERE "categoryId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].categoryId}`)
    })
}


module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}