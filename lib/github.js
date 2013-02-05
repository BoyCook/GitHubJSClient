/*
    Github client
 */

var qs = require('qs');
var request = require('request');

function GitHub() {
    this.baseUrl = 'https://api.github.com';
}

GitHub.prototype.getUsersRepos = function(user, error, success) {
    var path = '/users/' + user + '/repos';
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

GitHub.prototype.getUsersGists = function(user, error, success) {
    var path = '/users/' + user + '/gists';
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

GitHub.prototype.doRequest = function (url, error, success) {
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            success(JSON.parse(body));
        } else {
            error(response.statusCode, body);
        }
    })
};

GitHub.prototype.buildQS = function (params) {
    if (params && Object.keys(params).length > 0) {
        return '?' + qs.stringify(params);
    }
    return '';
};

if (!(typeof exports === 'undefined')) {
    exports.GitHub = GitHub;
}
