// connect angular application to index.html and include needed libraries
var app = angular.module('app', ['leaflet-directive', 'ngMaterial', 'ngMessages', 'ngRoute']);

// disable leaflet logging
app.config(function($logProvider, $routeProvider){
    $logProvider.debugEnabled(false);

    $routeProvider.when('/', {
        controller: 'MainCtrl',
        template: '<div>From MyService:</div>',
        resolve: {
            'floorDataServiceData': function (floorDataService) {
                // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
                return floorDataService.promise;
            }
        }
    })
});