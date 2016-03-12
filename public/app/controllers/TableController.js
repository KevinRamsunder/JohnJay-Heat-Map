// create and link 'TableController' controller to angular application
app.controller('TableController', tableController);

// inject dependencies into 'TableController' controller
tableController.$inject = ['$scope', 'tableToMapService'];

function tableController($scope, tableToMapService) {
    var self = this;

    console.log(tableToMapService.getColorFromRanges(73.13));
};
