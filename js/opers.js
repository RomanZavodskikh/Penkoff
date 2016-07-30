'use strict';
function monthToNumber ( string ) {
    switch (string) {
        case "января": return 1;
        case "февраля": return 2;
        case "марта": return 3;
        case "апреля": return 4;
        case "мая": return 5;
        case "июня": return 6;
        case "июля": return 7;
        case "августа": return 8;
        case "сентября": return 9;
        case "октября": return 10;
        case "ноября": return 11;
        case "декабря": return 12;
        default: console.log("Wrong month string!!!");
    }
}

function compareOpers ( a, b ) {
    if ( monthToNumber(a.month) < monthToNumber(b.month) ) {
        return 1;
    } else if ( monthToNumber(a.month) > monthToNumber(b.month) ) {
        return -1;
    } else if ( Number(a.date) < Number(b.date) ) {
        return 1;
    } else {
        return -1;
    }
}

$.getJSON("js/opers.json", function ( json ) {
    var done = 0;
    var draft = 0;
    var sign = 0;
    var queue = 0;
    var rej = 0;
    var file = 0;

    var opers = json.opers;
    opers.sort(compareOpers);


    for (var i = 0; i < opers.length; i++) {
        document.getElementById("transactions").innerHTML += '<div class="operation" id="op' + i + '"><div class="date">' + opers[i].date + " " + opers[i].month + '</div><div class="company">' +  opers[i].company + '</div><div class="text">' + opers[i].text + '</div><div class="cash">' + opers[i].cash + opers[i].currency + '</div></div>';

        switch(opers[i].state) {
            case "done":
                done++;
            break;
            case "draft":
                draft++;
            break;
            case "sign":
                sign++;
            break;
            case "queue":
                queue++;
            break;
            case "rej":
                rej++;
            break;
            case "file":
                file++;
            break;
            default:
                console.log("Error in JSON opers array member state on element #" + i);
            break;
        }
    }

    var NUM_OF_DOL_OPERS = opers.filter(function(x){return x.currency==="$"}).length;
    var NUM_OF_RUB_OPERS = opers.filter(function(x){return x.currency==="р"}).length;
    var WIDTH=$("#dollar_svg").width();
    var HEIGHT=$("#dollar_svg").height();
    var SQUEZZE=20;
    var x1_dol = 0;
    var y1_dol = 0;
    var x1_rub = 0;
    var y1_rub = 0;
    for (i = opers.length-1; i >= 0; i--) {
        if (opers[i].currency === "$") {
            var x2_dol = x1_dol + WIDTH/NUM_OF_DOL_OPERS;
            var y2_dol = y1_dol + opers[i].cash/SQUEZZE;
            document.getElementById("dollar_svg").innerHTML += '<line class="line" x1=' + x1_dol + ' y1=' + (HEIGHT/2-y1_dol) + ' x2=' + x2_dol + ' y2=' + (HEIGHT/2-y2_dol) + ' />'
            x1_dol = x2_dol;
            y1_dol = y2_dol;
        } else if (opers[i].currency === "р") {
            var x2_rub = x1_rub + WIDTH/NUM_OF_RUB_OPERS;
            var y2_rub = y1_rub + opers[i].cash/SQUEZZE;
            document.getElementById("rouble_svg").innerHTML += '<line class="line" x1=' + x1_rub + ' y1=' + (HEIGHT/2-y1_rub) + ' x2=' + x2_rub + ' y2=' + (HEIGHT/2-y2_rub) + ' />'
            x1_rub = x2_rub;
            y1_rub = y2_rub;
        }
    }

    document.getElementById("done").innerHTML += " " + done;
    document.getElementById("draft").innerHTML += " " + draft;
    document.getElementById("sign").innerHTML += " " + sign;
    document.getElementById("queue").innerHTML += " " + queue;
    document.getElementById("rej").innerHTML += " " + rej;
    document.getElementById("file").innerHTML += " " + file;
});
