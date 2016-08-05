    var app = angular.module('myApp', []);
app.controller("myCtrl", function($scope) {
    $scope.body_style = {};
    $scope.modal_style = {};
    $scope.white_menu_style = {};
    $scope.black_menu_style = {};

    $scope.toggle_white = function () {
        $scope.black_menu_style = {display: "none"};
        $scope.black_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        if ($scope.white_menu_style.display !== "block") {
            $scope.white_menu_style = {display: "block"};
            $scope.white_menu_hider_style = {backgroundImage: "url('img/menu_close.svg')"};
        } else {
            $scope.white_menu_style = {display: "none"};
            $scope.white_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        }
    };

    $scope.toggle_black = function () {
        $scope.white_menu_style = {display: "none"};
        $scope.white_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        if ($scope.black_menu_style.display !== "block") {
            $scope.black_menu_style = {display: "block"};
            $scope.black_menu_hider_style = {backgroundImage: "url('img/menu_close.svg')"};
        } else {
            $scope.black_menu_style = {display: "none"};
            $scope.black_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        }
    };

    $scope.hide_modal = function () {
        $scope.modal_style = {display: "none"};
    };

    $scope.show_modal = function () {
        $scope.modal_style = {display: "block"};
    };

    $scope.make_body_grey = function () {
        $scope.body_style = {background: '#F6F7F9'};
    }

    $scope.make_body_blue = function () {
        $scope.body_style = {background: '#0000FF'};
    }

    $scope.make_body_violet = function () {
        $scope.body_style = {background: '#8B00FF'};
    }
});
