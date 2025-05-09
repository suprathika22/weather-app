var app = angular.module('weatherApp', []);

app.controller('WeatherController', function($scope, $http) {
    $scope.backgroundImage = "images/bg.avif";

    $scope.getWeather = function() {
        var apiKey = '0f1943dfac4d21db4cc1ea5a46c51b26';
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${$scope.city}&appid=${apiKey}&units=metric`;

        $http.get(url).then(function(response) {
            $scope.temperature = response.data.main.temp;
            $scope.condition = response.data.weather[0].main.toLowerCase();
            $scope.error = null;

            if ($scope.temperature < 0 && $scope.condition !== 'rain' && $scope.condition !== 'thunderstorm') {
                $scope.backgroundImage = "images/snow.jpeg";
            } else {
                switch ($scope.condition) {
                    case 'clear':
                        $scope.backgroundImage = "images/clear.webp";
                        break;
                    case 'clouds':
                        $scope.backgroundImage = "images/clouds.jpg";
                        break;
                    case 'rain':
                    case 'drizzle':
                        $scope.backgroundImage = "images/rainy.avif";
                        break;
                    case 'snow':
                        $scope.backgroundImage = "images/snow.jpeg";
                        break;
                    case 'thunderstorm':
                        $scope.backgroundImage = "images/thunderstorm.webp";
                        break;
                    default:
                        $scope.backgroundImage = "images/bg.avif";
                }
            }
        }, function() {
            $scope.error = "City not found or API error!";
            $scope.temperature = null;
            $scope.condition = null;
            $scope.backgroundImage = "images/bg.avif";
        });
    };
});
