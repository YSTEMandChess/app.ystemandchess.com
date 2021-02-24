var express = require("express");
var app = express();
const router = express.Router()
var crypto = require('crypto');
const { count } = require("console");
// Allow Cross Origin Requests (other ips can request data)

// Load the JWT library

// Random Key. Needs to be changed later
const key = process.env.INDEX_KEY
let username
let password
let firstname
let lastname 
let reason
let email
let students
let parentUsername
let role 

// GET values from client
router.post('/index', function(req, res) {
    username = req.params.username
    password = req.params.password
    firstname = req.params.first 
    lastname = req.params.last
    reason = req.params.reason  
    email = req.params.email
    students = req.params.students
    parentUsername = req.params.parentUsername
    role = req.params.role
})

// Create the user.
if(reason == "create") {
    if(!username || !password || !firstname || !lastname || !role) {
        console.log("Not all of the parameters were found. Please ensure that you pass: username, password, first, last, and role as well.")
        return
    }
    createUser(username, password, firstname, lastname, email, role, students, parentUsername)
    // Verify. The user claims to be already in the system. Making sure that they are who they claim to be. Checking their username and password
} else if(reason == "verify") {
    if(!username || !password) {
        console.log("Not all of the parameters were found. Please ensure that you pass: username and password as well.")
        return
    }
    verifyUser(username, password)
}
// Authenticate. Verify that the JWT is vaalid and allow them access to the page (if they have permission)
else if(reason == "authenticate") {
    if(!jwt) {
        console.log("Not all of the parameters were found. Please ensure that you pass: jwt as well.")
        return
    }

// Something went wrong
} else {
    console.log("Invalid reason. Must be create, verify, authenticate.")
    return
}

function createUser(username, password, firstname, lastname, email, role, students, parentUsername) {
    // MONGODB connection NEEDS TO BE ADDED
    // DELETE THIS COMMENT AFTER A CONNECTION IS ESTABLISHED HERE
    const client

    // PHP CODE FOR IT
    // $collection = $client->ystem->users;
    collection = ""

    if(isTakenUsername(username, collection)) {
        console.log("This username has been taken. Please choose another.")
        return
    }

    const hashPass = crypto.createHash("sha384").update(password).digest("hex")

    if(role == "parent") {
        // They are a parent, will need to create a different document
        try {
            const studentInfo = JSON.parse(students)
        } catch(error) {
            console.log("Error decoding json")
            return
        }

        for(let i = 0; i < count(studentInfo); i++) {
            if(isTakenUsername(studentInfo[i].username, collection)) {
                console.log("Student " + i + " username has been taken. Please choose another.")
                return
            }
        }

        let sUsernames = []
        for(let i=0; i < count(studentInfo); i++) {
            let studentUsername = studentInfo[i].username
            let studentFirst = studentInfo[i].first
            let studentLast = studentInfo[i].last
            let studentPassword = crypto.createHash("sha384").update(studentInfo[i].password).digest("hex")
            let lessonsCompleted = createLessonObject()

            //insert all students into the collections
        }

        // create the parent account

    } else if(role == "student") {
        // If they are a student, then we will need to add a link to the parent.
        const lessonsCompleted = createLessonObject()
        //create student account

        // Now find the parent and update their children.

    //if mentor
    } else {
        // Add mentor to database
    }

    let payload = {
        "username": username,
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "role": role,
        "iat": Date.now(),
        //eat?
    }

    //create jwt

    return jwt
}

function createLessonObject() {
    const pawnLessonObject = {
        "piece": "pawn",
        "lessonNumber": 0
    }
    const rookLessonObject = {
        "piece": "rook",
        "lessonNumber": 0
    }

    const bishopLessonObject = {
        "piece": "bishop",
        "lessonNumber": 0
    }

    const kingLessonObject = {
        "piece": "king",
        "lessonNumber": 0
    }

    const queenLessonObject = {
        "piece": "queen",
        "lessonNumber": 0
    }

    const horseLessonObject = {
        "piece": "horse",
        "lessonNumber": 0
    }

    const lessons = [
        pawnLessonObject, 
        rookLessonObject, 
        bishopLessonObject,
        kingLessonObject,
        queenLessonObject,
        horseLessonObject,
    ]
    return lessons
}

function verifyUser(username, password) {
    // Mongo DB LOGIN

    let hashPass = crypto.createHash("sha384").update(password).digest("hex")

    //get user table
    // PHP CODE: $collection = $client->ystem->users;

    
}

function isTakenUsername(username, collection) {

}


