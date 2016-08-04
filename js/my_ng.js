var app = angular.module('myApp', []);
app.controller("myCtrl", function($scope) {
    $scope.white_hidden = "";
    $scope.black_hidden = "";

    $scope.toggle_white = function () {
        $scope.black_hidden = "none";
        $scope.black_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        if ($scope.white_hidden !== "block") {
            $scope.white_hidden = "block";
            $scope.white_menu_hider_style = {backgroundImage: "url('img/menu_close.svg')"};
        } else {
            $scope.white_hidden = "none";
            $scope.white_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        }
    };

    $scope.toggle_black = function () {
        $scope.white_hidden = "none";
        $scope.white_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        if ($scope.black_hidden !== "block") {
            $scope.black_hidden = "block";
            $scope.black_menu_hider_style = {backgroundImage: "url('img/menu_close.svg')"};
        } else {
            $scope.black_hidden = "none";
            $scope.black_menu_hider_style = {backgroundImage: "url('img/menu.svg')"};
        }
    };

    $scope.hide_modal = function () {
        $scope.modal_display = "none";
    };

    $scope.show_modal = function () {
        $scope.modal_display = "block";
    };
});
