# AWT - Student Project Sign up portal


## Geting started
*Development*

For the first time only pull the code and install the packages locally
```
git clone git@github.com:haseeb1431/awtProjectSignup.git.git
npm install
npm start
```
Currently we are using Azurepostgress and it will automatically connect to the database hosted in the cloud and application should work without any additional setup. 

after that every time, just run `git pull` to get latest

```
git pull
git branch newbranchName #create a new branch for the task you want to work on 
git push # once changes are complete, do the git push and then we will merge
```

### Git Commands
```
git clone URL #to copy the repo
Git status #changed files in local repo
git diff #changes to tracked files
git add . #add all the files to next commit or stage them
git reset filename #
git commit #commit staged changes
git commit -a #commit all changed files
```
### Branches
```git branch -av #list all branches
git checkout <branch> #switch to different branch
git branch #will show the branch
git branch newbranchName #create a new branch from the current commit
git diff branchB...branchA #diff of what is in A that is not in B 
```

### Git Rebase
```
Git checkout develop
git pull origin develop #git pull from the origin
git checkout branchName
git merge develop #for conflicts, do #gitstash and then merge and then git stash pop
git push
```

### Git Cheat sheet
https://education.github.com/git-cheat-sheet-education.pdf

### working on our own branch
we need to do these 3 things after you already got the code on your local machine
```git pull
git checkout anubhav #or your branch name
#Haseeb: once changes are done, do commit and push
git commit -a -m "what are the changes you did"
git push
```

## Machine setup

```
npm i bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator
npm i -D nodemon

npm run server # run the app
```

## Author
Anubhav Guha, Pradyumna Kashyap, Haseeb Asif



