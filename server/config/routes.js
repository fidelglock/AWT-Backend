
const proj = require('../models/projects');
const user = require('../models/users');
const student = require('../models/students');
const studentproject = require('../models/studentProjects');
const category = require('../models/category');

const { generateToken, sendToken, createToken } = require('./token.utils');
const withAuth = require('./secureMiddleware')

module.exports = function (app, passport) {

    app.get('/projects', proj.getProjects)
    app.get('/projects/:id', proj.getProjectById)
    app.get('/projects/category/:id', proj.getProjectByCategoryId)
    app.post('/projects', withAuth, proj.createProject)
    app.put('/projects/:id', withAuth, proj.updateProject)
    app.delete('/projects/:id', withAuth, proj.deleteProject)

    app.get('/users', user.getUsers)
    app.get('/users/:id', user.getUserById)
    app.post('/users', user.createUser)
    app.post('/login', user.userLogin);
    app.put('/users/:id', user.updateUser);
    app.delete('/users/:id', user.deleteUser);
    app.post('/sendemail', user.sendEmail);

    app.get('/students', student.getStudents)
    app.get('/students/:id', student.getStudentById)
    app.post('/students', student.createStudent)
    app.put('/students/:id', student.updateStudent)
    app.delete('/students/:id', student.deleteStudent)
    app.post('/studentsBulk', student.createStudentBulk)

    app.get('/studentproject', studentproject.getStudentProject)
    app.get('/studentproject/:id', studentproject.getStudentProjectById)
    app.post('/studentproject', studentproject.createStudentProject)
    app.put('/studentproject/:id', studentproject.updateStudentProject)
    app.delete('/studentproject/:id', studentproject.deleteStudentProject)
    app.get('/studentproject/student/:id', studentproject.getStudentProjectByStudentId)
    app.post('/studentprojectbulk', studentproject.createStudentProjectBulk);

    app.get('/category', category.getCategory);
    app.get('/category/:id', category.getCategoryById);
    app.post('/category', withAuth, category.createCategory);
    app.put('/category/:id', withAuth, category.updateCategory);
    app.delete('/category/:id', withAuth, category.deleteCategory);
    

    //login or locally authenticate
    app.post('/auth/local',
        passport.authenticate('localAuth', { session: false }),
        function (req, res, next) {

            if (!req.user) {
                return res.send(500, 'User Not Authenticated');
            }
            req.auth = {
                id: req.user.ID,               
                email: req.user.Email                
            };
    
            next();
        }, generateToken, sendToken
    );

    app.post("/loginAuth", function(req, res) {
        passport.authenticate("localAuth", function(err, user, info) {
          if (err) {
            res.status(404).json(err);
            return;
          }
  
          if (user) {
            const token = createToken(user);
            res.status(200);
            res.json({
              userInfo: user,
              token: token
            });
          } else {
            res.status(401).json(info);
          }
        })(req, res);
      });

};