const secretEmail = require("../fixtures/get_email_secret.js");

var CLIENT_ID = secretEmail.CLIENT_ID;
var API_KEY = secretEmail.CLIENT_ID;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function (error) {
        console.log("Error when initClient");
        console.log(error);
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        //listLabels();
        myTest();
    } else {
        handleAuthClick();
    }
}


/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
// function listLabels() {
//     gapi.client.gmail.users.labels.list({
//         'userId': 'me'
//     }).then(function (response) {
//         console.log(response);
//         var labels = response.result.labels;
//         appendPre('Labels:');
//
//         if (labels && labels.length > 0) {
//             for (var i = 0; i < labels.length; i++) {
//                 var label = labels[i];
//                 appendPre(label.name)
//             }
//         } else {
//             appendPre('No Labels found.');
//         }
//     });
//
// }

function myTest() {
    gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'INBOX',
        'maxResults': 5,
        'q': 'from:Александр Литвинов'
    }).then(function (response) {
        console.log(response);

        //console.log(response.result.messages[0]);
    });

    gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': "172eb61af895dcfb"
    }).then(function (response) {
        console.log(response);
        console.warn(getBody(response.result.payload));
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

//===================================================
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

export {
    handleClientLoad,
}
