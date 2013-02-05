/*
    Github client
 */

var OAuth = require('oauth').OAuth;
var qs = require('qs');
var request = require('request');

function GitHub(config) {
    this.consumerKey = config.consumerKey;
    this.consumerSecret = config.consumerSecret;
    this.accessToken = config.accessToken;
    this.accessTokenSecret = config.accessTokenSecret;
    this.callBackUrl = config.callBackUrl;
    this.baseUrl = 'https://api.github.com';
    this.oauth = new OAuth(
        'https://api.github.com/?request_token',
        'https://api.github.com/?access_token',
        this.consumerKey,
        this.consumerSecret,
        '1.0',
        this.callBackUrl,
        'HMAC-SHA1'
    );
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
    this.oauth.get(url, this.accessToken, this.accessTokenSecret, function (err, body, response) {
        console.log('URL [%s]', url);
        if (!err && response.statusCode == 200) {
            success(JSON.parse(body));
        } else {
            error(response.statusCode, body);
        }
    });
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
