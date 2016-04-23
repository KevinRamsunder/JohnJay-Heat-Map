app.service('LoadingService', function() {
    var self = this;

    // if currently loading csv files set true
    self.loading = false;
    self.makingRequest = false;

    self.loaderStatus = function () {
        return self.loading || self.makingRequest;
    };
});