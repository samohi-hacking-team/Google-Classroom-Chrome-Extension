/* const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly', "https://www.googleapis.com/auth/classroom.coursework.me", "https://www.googleapis.com/auth/classroom.coursework.me.readonly", "https://www.googleapis.com/auth/classroom.coursework.students", "https://www.googleapis.com/auth/classroom.coursework.students.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Classroom API.
    authorize(JSON.parse(content), listCourses);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
/* function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}
*/
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

/* 
function getNewToken(oAuth2Client, callback) {
   const authUrl = oAuth2Client.generateAuthUrl({
       access_type: 'offline',
       scope: SCOPES,
   });
   console.log('Authorize this app by visiting this url:', authUrl);
   const rl = readline.createInterface({
       input: process.stdin,
       output: process.stdout,
   });
   rl.question('Enter the code from that page here: ', (code) => {
       rl.close();
       oAuth2Client.getToken(code, (err, token) => {
           if (err) return console.error('Error retrieving access token', err);
           oAuth2Client.setCredentials(token);
           // Store the token to disk for later program executions
           fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
               if (err) return console.error(err);
               console.log('Token stored to', TOKEN_PATH);
           });
           callback(oAuth2Client);
       });
   });
}
*/
/**
 * Lists the first 10 courses the user has access to.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

/* 
function listCourses(auth) {
   const classroom = google.classroom({ version: 'v1', auth });
   classroom.courses.list({
       pageSize: 10,
   }, (err, res) => {
       if (err) return console.error('The API returned an error: ' + err);
       const courses = res.data.courses;
       if (courses && courses.length) {
           console.log('Courses:');
           courses.forEach((course) => {
               console.log(`${course.name} (${course.id})`);
           });
       } else {
           console.log('No courses found.');
       }
   });
}
*/

function listCourses(auth) {
    const classroom = google.classroom({ version: 'v1', auth });
    classroom.courses.list({
        pageSize: 10,
    }, (err, res) => {
        if (err) return console.error('The API returned an error: ' + err);
        const courses = res.data.courses;
        if (courses && courses.length) {
            console.log('Courses:');
            courses.forEach((course) => {
                console.log(`${course.name} (${course.id})`);
                classroom.courses.courseWork.list({
                    "courseId": course.id,
                    "courseWorkStates": ["PUBLISHED"],
                    "orderBy": "dueDate desc"
                })

                    .then(function (response) {
                        console.log("Got response")
                        const courseWork = response.data.courseWork;
                        data = [];
                        courseWork.forEach((item) => {
                            if (item.dueDate.year == 2020 && item.dueDate.month == 4 && item.dueDate.day == 4) {
                                var t = new Date(item.dueDate.year, item.dueDate.month, item.dueDate.day, item.dueTime.hours, item.dueTime.minutes);
                                //console.log(t);
                                var n = t.toLocaleDateString();
                                console.log(course.name + " " + item.title + " " + t)
                                //console.log(item.dueDate.year, item.dueDate.month, item.dueDate.day, item.dueTime.hours, item.dueTime.minutes)
                                // console.log(course.name, item.title, item.dueDate, item.dueDate.day)
                                data.push({ class: course.name, work: item.title, due: t })
                            }
                        })
                        buildTable2(data)
                        //console.log(response.courseWork)

                    },




                        function (err) {
                            console.error(err)
                        }

                    )
            });
        } else {
            console.log('No courses found.');
        }
    });
}

function addElipses(x) {
    var y;
    var z;

    if (x.length > 37) {
        y = x.substr(0, 37);
        z = y.substr(0, y.lastIndexOf(" "));
        return (z + "...");
    } else {
        return (x);
    }
}

var myArray2 = [
    { 'class': 'English', 'work': 'Read 20 mins', 'due': '11:00 AM' },
    { 'class': 'English', 'work': 'Write Essay', 'due': '11:00 PM' },
    { 'class': 'Math', 'work': 'Trig functions and parallel lines using math stuff', 'due': '11:00 PM' },
    { 'class': 'Science', 'work': 'Study whales', 'due': '11:00 AM' },
]
//buildTable2(data)

function buildTable2(data) {
    var table = document.getElementById('myTable2')

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                        <td class="classcolumn">${addElipses(data[i].class)}</td>
                        <td class="workcolumn">${addElipses(data[i].work)}</td>
                        <td class="duecolumn">${data[i].due}</td>
                  </tr>`
        table.innerHTML += row


    }
}

var myArray = [
    { 'day': 'Today', 'asignments': 'Assignments' },
]

buildTable(myArray)
function buildTable(data) {
    var table = document.getElementById('myTable')

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
        <td class="daybox">${data[i].day}</td>
        <td class="dayhead">${data[i].asignments}</td>
  </tr>`
        table.innerHTML += row
    }
}


var tomAssignments = [
    { 'day': 'Tomorrow', 'asignments': 'Assignments' },
]

buildTable(tomAssignments)
function buildTable(data) {
    var table = document.getElementById('myTable5')

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
        <td class="daybox">${data[i].day}</td>
        <td class="dayhead">${data[i].asignments}</td>
  </tr>`
        table.innerHTML += row
    }
}