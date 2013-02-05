var GitHub = require('../../lib/github').GitHub;

describe('GitHub', function () {
    var gitHub;

    var error = function (code, data) {
        console.log('ERROR [%s]', code);
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
                expect(data.length).toEqual(27);
                done();
            }
        );
    });

    it('should get users gists', function (done) {
        gitHub.getUsersGists('BoyCook', error,
            function (data) {
                expect(data.length).toEqual(5);
                done();
            }
        );
    });
});
