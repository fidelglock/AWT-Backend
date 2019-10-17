const { pool } = require('./db');

const getProjects = (request, response) => {
    pool.query('SELECT * FROM "awt".projects left join "awt"."Category" on "projects"."CategoryID"  = "Category"."categoryId" ORDER BY "ProjectId" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProjectById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "awt".projects WHERE "ProjectId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getProjectByCategoryId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "awt".projects left join "awt"."Category" on "projects"."CategoryID"  = "Category"."categoryId" where "Category"."categoryId" = $1',
     [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



const createProject = (request, response) => {
    const { Title, Description, CategoryID, Prereq, MaxStudent } = request.body;

    pool.query('INSERT INTO "awt".projects ("Title", "Description", "CategoryID", "Prereq", "MaxStudent") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [Title, Description, CategoryID, Prereq, MaxStudent], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).json(result.rows[0]);            
        });
}


const updateProject = (request, response) => {
    const id = parseInt(request.params.id)
    const { Title, Description, CategoryID, Prereq, MaxStudent  } = request.body

    pool.query(
        'UPDATE "awt".projects SET "Title" = $1, "Description" = $2, "CategoryID" = $3, "Prereq" = $4, "MaxStudent" = $5 WHERE "ProjectId" = $6 RETURNING "ProjectId"',
        [Title, Description, CategoryID, Prereq, MaxStudent , id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows[0]);
        }
    );
}


const deleteProject = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "awt".projects WHERE "ProjectId" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}


module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectByCategoryId
}