const settings = require('./settings');
const http = require("http");
const port = settings.port;

const getGmailCode = require("./gmail_api/node_get_gmail");

const requestHandler = (request, response) => {
    response.setHeader("Content-Type", "application/json; charset=utf-8;");
    if(request.url === "/get_code_from_gmail" /*|| request.url === "/"*/){
        // now response from getGmailCode
        getGmailCode(response);
        //response.write(JSON.stringify({code: 123456}));
    } else {
        response.statusCode = 404; // адрес не найден
        response.write("Not Found");
        response.end();
    }
    //response.end(); -- make an end in every route separatly
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Сервер доступен по адресу localhost:${port}`);
    console.log(`server is listening on ${port}...`)
});
