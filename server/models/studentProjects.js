const { pool } = require('./db');


const getStudentProject = (request, response) => {
    pool.query('SELECT * FROM awt."StudentProject" stdprj INNER JOIN 	awt."projects" prj on stdprj."ProjectID" = prj."ProjectId"'+ 
	'INNER JOIN awt."Students" std on stdprj."StudentID"= std."StudentID"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentProjectByProject = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM awt."StudentProject" stdprj INNER JOIN 	awt."projects" prj on stdprj."ProjectID" = prj."ProjectId"'+ 
	'INNER JOIN awt."Students" std on stdprj."StudentID"= std."StudentID" where prj."ProjectId"=$1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentProjectByStudentId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM awt."StudentProject" stdprj INNER JOIN 	awt."projects" prj on stdprj."ProjectID" = prj."ProjectId"'+ 
	'INNER JOIN awt."Students" std on stdprj."StudentID"= std."StudentID" where std."StudentID" = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentProjectById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "awt"."StudentProject" WHERE "ID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createStudentProject = (request, response) => {
    const { studentid, projectid, preference } = request.body

    pool.query('INSERT INTO "awt"."StudentProject" ("StudentID", "ProjectID", "Preference") VALUES ($1, $2, $3)',
        [studentid, projectid, preference], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`${result.rowCount} Student Project added `)
        })
}

const createStudentProjectBulk = (request, response) => {
    var arr = request.body;

    var query = 'INSERT INTO "awt"."StudentProject" ("StudentID", "ProjectID", "Preference") VALUES ';

    arr.forEach(function (item, index) {
        query += '('+item.studentid + ","+ item.projectid + ","+ item.preference + "),";
    });

    query = query.slice(0, -1);
    
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`${result.rowCount} Student Project added `)
    });
}


const updateStudentProject = (request, response) => {
    const id = parseInt(request.params.id)
    const {  studentid, projectid, preference } = request.body

    pool.query(
        'UPDATE "awt"."StudentProject" SET "StudentID" = $1, "ProjectID" = $2, "Preference"= $3 WHERE "ID" = $4 ',
        [ studentid, projectid, preference, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Users updated: ${results.rowCount}`)
        }
    )
}


const deleteStudentProject = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "awt"."StudentProject" WHERE "ID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}


module.exports = {
    getStudentProject,
    getStudentProjectByProject,
    getStudentProjectById,
    createStudentProject,
    updateStudentProject,
    deleteStudentProject,
    getStudentProjectByStudentId,
    createStudentProjectBulk
}