// connect angular application to index.html and include needed libraries
var app = angular.module('app', ['leaflet-directive', 'ngMaterial', 'ngMessages', 'ui.bootstrap']);

// disable leaflet logging
app.config(function($logProvider){
    $logProvider.debugEnabled(false);
});