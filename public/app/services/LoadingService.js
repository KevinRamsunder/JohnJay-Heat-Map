app.service('loadingService', function() {
    var self = this;

    // if currently loading csv files set true
    self.loading = false;
    self.makingRequest = false;

});