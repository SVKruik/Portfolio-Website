const shell = require("shelljs");

function deployApplication() {
    shell.exec("sh deploy.sh");
}

module.exports = {
    "deployApplication": deployApplication
}