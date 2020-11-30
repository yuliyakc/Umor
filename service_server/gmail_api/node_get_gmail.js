const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const settings = require('../settings');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = settings.TOKEN_PATH;

let http_response = null;


function getData(response) {
    http_response = response;
    console.log(settings);
    fs.readFile(settings.CREDENTIALS_PATH, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Gmail API.
        authorize(JSON.parse(content), myTest);
    });
}

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    //Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

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

async function myTest(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'INBOX',
        'maxResults': 1,
        'q': 'from:' + settings.EMAIL_FROM
    }).then(async function (response) {
        console.log(response.data);
        if (response.data.messages.length > 0) {
            let messageId = response.data.messages[0].id;
            console.log('messageId: ' + messageId);
            let code = await getCode(gmail, messageId);
            http_response.write(JSON.stringify({code: code}));
            http_response.end();
        }
    });
}

//===================================================
function getBody(message) {
    var encodedBody = '';
    if (typeof message.parts === 'undefined') {
        encodedBody = message.body.data;
    }
    else {
        encodedBody = getHTMLPart(message.parts);
    }
    encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob(encodedBody)));
}

function getHTMLPart(arr) {
    for (var x = 0; x <= arr.length; x++) {
        if (typeof arr[x].parts === 'undefined') {
            if (arr[x].mimeType === 'text/html') {
                return arr[x].body.data;
            }
        }
        else {
            return getHTMLPart(arr[x].parts);
        }
    }
    return '';
}

async function getCode(gmail, emailId) {
    let code = 0;
    await gmail.users.messages.get({
        'userId': 'me',
        'id': emailId
    }).then(function (response) {
        var headers = response.data.payload.headers;
        for (let key in headers) {
            if (headers[key].name === "Subject") {
                let Subject = headers[key].value;
                //console.log('Subject: ' + Subject);
                let parts = Subject.split(' ');
                let lastPart = parts[parts.length - 1];
                code = lastPart;
            }
        }
    });

    return code;
}

module.exports = getData;
