'use strict';
var app = angular.module('myApp', []);
app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
app.controller("myCtrl", function($scope) {
    $scope.grey_style = {border: "3px black solid"};

    $scope.createTrans = function  (corp, text, cash, curr, date) {
        return {
            company: corp,
            text: text,
            cash: cash,
            currency: curr,
            date_str: date
        };
    };

    $scope.compareOpersByDate = function  (a, b) {
        return -( Date.parse(a.date_str) - Date.parse(b.date_str) );
    };

    $scope.dateFormat = function ( date_str ) {
        var cur_date = new Date(Date.parse(date_str));

        var month = "";
        switch (cur_date.getMonth()) {
            case 0: month = "января"; break;
            case 1: month = "февраля"; break;
            case 2: month = "марта"; break;
            case 3: month = "апреля"; break;
            case 4: month = "мая"; break;
            case 5: month = "июня"; break;
            case 6: month = "июля"; break;
            case 7: month = "августа"; break;
            case 8: month = "сентября"; break;
            case 9: month = "октября"; break;
            case 10: month = "ноября"; break;
            case 11: month = "декабря"; break;
            default: console.log("Error: invalid month in date"); break;
        }

        return cur_date.getDate().toString() + " " + month;
    };

    $scope.transactions = [
        $scope.createTrans("ООО Сбербанк", "Проценты по кредиту", "-450", "$", "2016-02-05T10:02:23"),
        $scope.createTrans("ООО Prisma Atlantic", "Стандартное назначение платежа абонентское обслуживание ООО Открытые бизнес-системы договор номер 134234235", "300", "$", "2016-09-04T12:23:11"),
        $scope.createTrans("ООО МММ", "Проценты от Серого", "120", "$", "2016-08-03T17:29:54"),
        $scope.createTrans("ООО Газпром", "Доход по акциям", "241", "$", "2016-11-01T09:01:00"),
        $scope.createTrans("ООО Теньков", "Взятка", "100", "$", "2016-04-29T21:56:01"),
        $scope.createTrans("ИП Имаметдинов Димас", "Плата за саппорт", "200", "$", "2016-05-06T14:12:32"),
        $scope.createTrans("ЖКХ", "Счёт за воду", "-350", "$", "2016-05-05T14:12:32"),
        $scope.createTrans("ЖКХ", "Счёт за свет", "-150", "$", "2016-05-07T14:12:32"),
        $scope.createTrans("ИП Люся", "Плата за тортик", "-50", "$", "2016-05-09T14:12:32"),
        $scope.createTrans("Starbucks", "Кофе", "-199", "р", "2016-05-07T14:12:32"),
        $scope.createTrans("KFC", "Острые куриные крылышки, 8 шт.", "-399", "р", "2016-05-08T14:12:32")
    ].sort($scope.compareOpersByDate);
    $scope.transactionsDollar = $scope.transactions.filter(function(x){return x.currency==="$"});
    $scope.transactionsRouble = $scope.transactions.filter(function(x){return x.currency==="р"});
    $scope.cash = {rouble: 1000, dollar: 1000}
    $scope.graphHeight = 300;
    $scope.viewPortScale = 1000;
    $scope.pointsRouble = "";
    $scope.pointsDollar = "";

    $scope.renderGraphs = function () {
        $scope.pointsRouble += "0, 0,";
        for (var i = $scope.transactionsRouble.length-1; i >= 0; i--) {
            $scope.pointsRouble += ($scope.transactionsRouble.length-i)*1000/$scope.transactionsRouble.length + ',';
            $scope.cash.rouble += parseInt($scope.transactionsRouble[i].cash);
            $scope.pointsRouble += (1000-$scope.cash.rouble)*1000/$scope.viewPortScale + ',';
        }

        $scope.pointsDollar += "0, 0,";
        for (var i = $scope.transactionsDollar.length-1; i >= 0; i--) {
            $scope.pointsDollar += ($scope.transactionsDollar.length-i)*1000/$scope.transactionsDollar.length + ',';
            $scope.cash.dollar += parseInt($scope.transactionsDollar[i].cash);
            $scope.pointsDollar += (1000-$scope.cash.dollar)*1000/$scope.viewPortScale + ',';
        }
    };

    $scope.show_profile = function () {
        $scope.black_menu_style = {display: "block", position: "fixed", height: "100%", zIndex: 1, width: "100%", overflow: "auto",
            left: "0", top: "0"};
    };

    $scope.hide_profile = function () {
        $scope.black_menu_style = {};
    };

    $scope.show_menu = function () {
        $scope.white_menu_style = {display: "block", position: "fixed", height: "100%", zIndex: 1, width: "100%", overflow: "auto",
            left: "0", top: "0", background: "#FFFFFF"};
    };

    $scope.hide_menu = function () {
        $scope.white_menu_style = {};
    };

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
    };

    $scope.make_body_blue = function () {
        $scope.body_style = {background: '#0000FF'};
        $scope.grey_style = {};
        $scope.blue_style = {border: "3px solid black"};
        $scope.purp_style = {};
    };

    $scope.make_body_violet = function () {
        $scope.body_style = {background: '#8B00FF'};
        $scope.grey_style = {};
        $scope.blue_style = {};
        $scope.purp_style = {border: "3px solid black"};
    };

    $scope.renderGraphs();
});
