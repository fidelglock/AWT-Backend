const { pool } = require('./db');


const getStudents = (request, response) => {
    pool.query('SELECT * FROM "awt"."Students" ORDER BY "StudentID" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM "awt"."Students" WHERE "StudentID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}


const createStudent = (request, response) => {
    const { studentid, name, email } = request.body

    pool.query('INSERT INTO "awt"."Students" ("StudentID", "StudentName", "StudentEmail") VALUES ($1, $2, $3)',
        [studentid, name, email], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`${result.rowCount} User added `)
        })
}


const updateStudent = (request, response) => {
    const id = parseInt(request.params.id)
    const { studentid, name, email } = request.body

    pool.query(
        'UPDATE "awt"."Students" SET "StudentName" = $1, "StudentEmail" = $2 WHERE "StudentID" = $3 ',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Users updated: ${results.rowCount}`)
        }
    )
}


const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM "awt"."Students" WHERE "StudentID" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Project deleted with ID: ${results.rows[0].ProjectId}`)
    })
}

const createStudentBulk = (request, response) => {
    var arr = request.body;

    var query = 'INSERT INTO "awt"."Students" ("StudentID", "StudentName", "StudentEmail") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING';

    var totalrows = arr.length;
    var i = 0;
    arr.forEach(function (item, index) {
        pool.query(query, [item.studentid,item.name, item.email], (error, result) => {
            if (error) {
                throw error
            }
            i = i + 1
            if (i == totalrows) {
                response.status(201).json(`${result.rowCount} Student Project added `);
            }
        });
    });
}


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    createStudentBulk
}