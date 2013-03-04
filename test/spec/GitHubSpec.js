var GitHub = require('../../lib/github').GitHub;

describe('GitHub', function () {
    var gitHub;
    var error = function (err, response, body) {
        console.log('ERROR [%s] - [%s] - [%s]', err, response, body);
        done();
    };

    beforeEach(function (done) {
        gitHub = new GitHub();
        expect(gitHub).toBeDefined();
        done();
    });

    it('should get users repos', function (done) {
        gitHub.getUsersRepos('BoyCook', error,
            function (data) {
                expect(data.length).toEqual(28);
                done();
            }
        );
    });

    it('should get users gists', function (done) {
        gitHub.getUsersGists('BoyCook', error,
            function (data) {
                expect(data.length).toEqual(7);
                done();
            }
        );
    });

    it('should get users events', function (done) {
        gitHub.getUsersEvents('BoyCook', error,
            function (data) {
                expect(data.length).toEqual(30);
                done();
            }
        );
    });
});
