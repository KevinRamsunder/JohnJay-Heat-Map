// create and link 'TableController' controller to angular application
app.controller('TableController', tableController);

// inject dependencies into 'TableController' controller
tableController.$inject = ['$scope', 'TableToMapService'];

function tableController($scope, TableToMapService) {
    var self = this;
}