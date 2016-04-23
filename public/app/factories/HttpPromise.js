app.factory('HttpPromise', function($http) {
    return {
        getRoomNumbers: function getRoomNumbers() {
            return $http.get('app/assets/json/floor_10/room_num.json').then(function (response) {
                return response.data;
            });
        },
        getVavNumbers: function getVavNumbers() {
            return $http.get('app/assets/json/floor_10/vav.json').then(function (response) {
                return response.data;
            });
        },
        getWeatherData: function getWeatherData() {
            return $http.get('/api/v1/weather-data').then(function (response) {
                return response.data;
            });
        },
        getRoomData: function getRoomData() {
            return $http.get('/api/v1/rooms').then(function (response) {
                return response.data;
            });
        }
    }
});