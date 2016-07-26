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

$.getJSON("opers.json", function ( json ) {
    var done = 0;
    var draft = 0;
    var sign = 0;
    var queue = 0;
    var rej = 0;
    var file = 0;

    var opers = json.opers;
    opers.sort(compareOpers);


    var WIDTH=$("#dollar_svg").width();
    var HEIGHT=$("#dollar_svg").height();
    var SQUEZZE=20;
    var x1 = 0;
    var y1 = 0;
    for (i = 0; i < opers.length; i++) {
        document.getElementById("transactions").innerHTML += '<div class="operation" id="op' + i + '"><div class="date">' + opers[i].date + " " + opers[i].month + '</div><div class="company">' +  opers[i].company + '</div><div class="text">' + opers[i].text + '</div><div class="cash">' + opers[i].cash + opers[i].currency + '</div></div>';

        var x2 = x1 + WIDTH/opers.length;
        var y2 = y1 + opers[i].cash/SQUEZZE;
        document.getElementById("dollar_svg").innerHTML += '<line class="line" x1=' + x1 + ' y1=' + (HEIGHT/2-y1) + ' x2=' + x2 + ' y2=' + (HEIGHT/2-y2) + ' />'
        x1 = x2;
        y1 = y2;

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

    document.getElementById("done").innerHTML += " " + done;
    document.getElementById("draft").innerHTML += " " + draft;
    document.getElementById("sign").innerHTML += " " + sign;
    document.getElementById("queue").innerHTML += " " + queue;
    document.getElementById("rej").innerHTML += " " + rej;
    document.getElementById("file").innerHTML += " " + file;
});
