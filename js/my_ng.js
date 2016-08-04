var app = angular.module('myApp', []);
app.controller("myCtrl", function($scope) {
    $scope.white_hidden = "";
    $scope.black_hidden = "";

    $scope.toggle_white = function () {
        $scope.black_hidden = "none";
        if ($scope.white_hidden !== "block") {
            $scope.white_hidden = "block";
        } else {
            $scope.white_hidden = "none";
        }
    };

    $scope.toggle_black = function () {
        $scope.white_hidden = "none";
        if ($scope.black_hidden !== "block") {
            $scope.black_hidden = "block";
        } else {
            $scope.black_hidden = "none";
        }
    };

    $scope.hide_modal = function () {
        $scope.modal_display = "none";
    };

    $scope.show_modal = function () {
        $scope.modal_display = "block";
    };
});
