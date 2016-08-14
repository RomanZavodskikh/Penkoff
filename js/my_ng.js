'use strict';
var app = angular.module('myApp', []);
app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
app.controller("myCtrl", function($scope) {
    var removeDuplicate = function (arr) {
        var result = [];
        var sort_arr = arr.sort();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i+1] !== arr[i]) {
                result.push(arr[i]);
            }
        }
        return result;
    };

    $scope.create_payment = function () {
        //The 0'th option is "Select Something" and cannot be selected
        $scope.error_nothing_selected_style = $scope.empty_client_selected_style =
            $scope.empty_text_selected_style = $scope.empty_sum_style =
            $scope.no_curr_style = $scope.overdraft_style = {};
        for (var i = 1; i < document.getElementById("client_select").childElementCount; i++) {
            if (document.getElementById("client_select")[i].selected) {
                var now = new Date();
                var corporation = $scope.selectedClient;
                if (corporation === "Другой") {
                    corporation = document.getElementById("corp_select").value;
                    var clients = $scope.clients;
                    clients.push(corporation);
                    $scope.clients = removeDuplicate(clients);
                }
                if (corporation === "") {
                    $scope.empty_client_selected_style = {display: "block"};
                    return;
                }

                var text = $scope.selectedText;
                if (text === undefined) {
                    $scope.empty_text_selected_style = {display: "block"};
                    return;
                }

                var cash = $scope.selectedCash;
                if (isNaN(cash) || cash === null) {
                    $scope.empty_sum_style = {display: "block"};
                    return;
                }

                var curr =  $scope.selectedCurr;
                if (curr === undefined) {
                    $scope.no_curr_style = {display: "block"};
                    return;
                }

                if (   curr === "$" && $scope.cash.dollar + cash < 0
                    || curr === "р" && $scope.cash.rouble + cash < 0) {
                    $scope.overdraft_style = {display: "block"};
                    return;
                }

                $scope.transactions.push($scope.createTrans(
                    corporation,
                    text,
                    cash,
                    curr,
                    now.toISOString()
                ));

                $scope.transactions.sort($scope.compareOpersByDate);
                $scope.renderGraphs();
                $scope.hide_modal_new_op();

                return; //We've done all that needed
            }
        }
        $scope.error_nothing_selected_style = {display: "block"};
    };

    $scope.toggleMobileInfo = function (event) {
        if ( document.body.clientWidth > 650) {
            //We're not in mobile device, go away from here!!!
            return;
        }

        if (   event.target.classList[0] === "date"
            || event.target.classList[0] === "cash") {
            if ( event.target.parentElement/*.operation*/.parentElement.childNodes[7].style.display == "" ) {
                //We need to hide all the rest first
                for (var child_ind in event.target.parentElement.parentElement.parentElement.childNodes) {
                    var grandGrandFathersChildren = event.target.parentElement.parentElement.parentElement.childNodes;
                    console.log(child_ind);
                    if (isFinite(child_ind) && grandGrandFathersChildren[child_ind].childNodes[7] && grandGrandFathersChildren[child_ind].childNodes[7].style.display == "block") {
                        grandGrandFathersChildren[child_ind].childNodes[7].style.display = "";
                    }
                }

                event.target.parentElement/*.operation*/.parentElement.childNodes[7].style.display = "block";
            } else {
                event.target.parentElement/*.operation*/.parentElement.childNodes[7].style.display = "";
            }
        }
    };

    $scope.grey_style = {border: "3px black solid"};
    $scope.corp_select_style = {display: "none"};

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
        $scope.createTrans("ООО Сбербанк", "Проценты по кредиту", "-450", "$", "2015-02-05T10:02:23"),
        $scope.createTrans("ООО Prisma Atlantic", "Стандартное назначение платежа абонентское обслуживание ООО Открытые бизнес-системы договор номер 134234235", "300", "$", "2015-09-04T12:23:11"),
        $scope.createTrans("ООО МММ", "Проценты от Серого", "120", "$", "2015-08-03T17:29:54"),
        $scope.createTrans("ООО Газпром", "Доход по акциям", "241", "$", "2015-11-01T09:01:00"),
        $scope.createTrans("ООО Теньков", "Взятка", "100", "$", "2015-04-29T21:56:01"),
        $scope.createTrans("ИП Имаметдинов Димас", "Плата за саппорт", "200", "$", "2015-05-06T14:12:32"),
        $scope.createTrans("ЖКХ", "Счёт за воду", "-350", "$", "2015-05-05T14:12:32"),
        $scope.createTrans("ЖКХ", "Счёт за свет", "-150", "$", "2015-05-07T14:12:32"),
        $scope.createTrans("ИП Люся", "Плата за тортик", "-50", "$", "2015-05-09T14:12:32"),
        $scope.createTrans("Starbucks", "Кофе", "-199", "р", "2015-05-07T14:12:32"),
        $scope.createTrans("KFC", "Острые куриные крылышки, 8 шт.", "-399", "р", "2015-05-08T14:12:32")
    ].sort($scope.compareOpersByDate);

    var clients = $scope.transactions.map(function(elem) {
        return elem.company;
    });
    $scope.clients = removeDuplicate(clients);

    $scope.initial_cash = {rouble: 1000, dollar: 1000};

    $scope.cash = {};
    $scope.cash.rouble = $scope.initial_cash.rouble;
    $scope.cash.dollar = $scope.initial_cash.dollar;

    $scope.graphHeight = 300;
    $scope.viewPortScale = 1000;

    $scope.renderGraphs = function () {
        $scope.transactionsDollar = $scope.transactions.filter(function(x){return x.currency==="$"});
        $scope.transactionsRouble = $scope.transactions.filter(function(x){return x.currency==="р"});

        $scope.cash.rouble = $scope.initial_cash.rouble;
        $scope.cash.dollar = $scope.initial_cash.dollar;

        var max = {rouble: $scope.cash.rouble, dollar: $scope.cash.dollar};

        for (var i = $scope.transactionsRouble.length-1; i >= 0; i--) {
            $scope.cash.rouble += parseInt($scope.transactionsRouble[i].cash);
            if ($scope.cash.rouble > max.rouble) {
                max.rouble = $scope.cash.rouble;
            }
        }

        for (var i = $scope.transactionsDollar.length-1; i >= 0; i--) {
            $scope.cash.dollar += parseInt($scope.transactionsDollar[i].cash);
            if ($scope.cash.dollar > max.dollar) {
                max.dollar = $scope.cash.dollar;
            }
        }

        $scope.cash.rouble = $scope.initial_cash.rouble;
        $scope.cash.dollar = $scope.initial_cash.dollar;

        $scope.pointsRouble = "0, " + ((max.rouble-$scope.cash.rouble)/max.rouble)*$scope.viewPortScale + ',';
        for (var i = $scope.transactionsRouble.length-1; i >= 0; i--) {
            $scope.pointsRouble += ($scope.transactionsRouble.length-i)*$scope.viewPortScale/$scope.transactionsRouble.length + ',';
            $scope.cash.rouble += parseInt($scope.transactionsRouble[i].cash);
            $scope.pointsRouble += ((max.rouble-$scope.cash.rouble)/max.rouble)*$scope.viewPortScale + ',';
        }

        $scope.pointsDollar = "0, " + ((max.dollar-$scope.cash.dollar)/max.dollar)*$scope.viewPortScale + ',';
        for (var i = $scope.transactionsDollar.length-1; i >= 0; i--) {
            $scope.pointsDollar += ($scope.transactionsDollar.length-i)*$scope.viewPortScale/$scope.transactionsDollar.length + ',';
            $scope.cash.dollar += parseInt($scope.transactionsDollar[i].cash);
            $scope.pointsDollar += ((max.dollar-$scope.cash.dollar)/max.dollar)*$scope.viewPortScale + ',';
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

    $scope.show_modal_new_op = function () {
        $scope.modal_new_op_style = {display: "block"};
    };

    $scope.hide_modal_new_op = function () {
        $scope.modal_new_op_style = {display: "none"};
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

    $scope.toggleCorpSelectStyle = function () {
        if ($scope.selectedClient === "Другой") {
            $scope.corp_select_style = {display: "inline"};
        } else {
            $scope.corp_select_style = {display: "none"};
        }
    };

    $scope.renderGraphs();
});
