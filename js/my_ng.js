var app = angular.module('myApp', []);
app.controller("myCtrl", function($scope) {
    $scope.body_style = {};
    $scope.modal_style = {};
    $scope.white_menu_style = {};
    $scope.black_menu_style = {};
    $scope.grey_style = {border: "3px black solid"};

    $scope.show_profile = function () {
        $scope.black_menu_style = {display: "block", position: "fixed", height: "100%", zIndex: 1, width: "100%", overflow: "auto",
            left: "0", top: "0"};
    };

    $scope.hide_profile = function () {
        $scope.black_menu_style = {};
    }

    $scope.show_menu = function () {
        $scope.white_menu_style = {display: "block", position: "fixed", height: "100%", zIndex: 1, width: "100%", overflow: "auto",
            left: "0", top: "0", background: "#FFFFFF"};
    }

    $scope.hide_menu = function () {
        $scope.white_menu_style = {};
    }

    $scope.hide_modal = function () {
        $scope.modal_style = {display: "none"};
    };

    $scope.show_modal = function () {
        $scope.modal_style = {display: "block"};
    };

    $scope.make_body_grey = function () {
        $scope.body_style = {background: '#F6F7F9'};
        $scope.grey_style = {border: "3px solid black"};
        $scope.blue_style = {};
        $scope.purp_style = {};
    }

    $scope.make_body_blue = function () {
        $scope.body_style = {background: '#0000FF'};
        $scope.grey_style = {};
        $scope.blue_style = {border: "3px solid black"};
        $scope.purp_style = {};
    }

    $scope.make_body_violet = function () {
        $scope.body_style = {background: '#8B00FF'};
        $scope.grey_style = {};
        $scope.blue_style = {};
        $scope.purp_style = {border: "3px solid black"};
    }
});
