$(document).ready(function() {
    var x;
    var resultDisplay = $("#results");
    $("input").on('input', function(e) {
        x = $("input").val();

        $.getJSON('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php', {
            action: 'query',
            generator: 'search',
            gsrsearch: x,
            gsrlimit: '10',
            prop: 'extracts',
            // exchars:'200',/* you can't use exchars and exsentences at the same time*/
            exintro: '',
            explaintext: '',
            exsentences: '1',
            exlimit: '10',
            format: 'json',
            formatversion: '2'
        }, function(data) {
            displayResult(data);
        });
    });

    function displayResult(json) {
        // console.log(x.length);
        if (x < 1) {
            $("#results").empty();
        }
        console.log(json);
        var result = json['query']['pages'];
        $("#results").empty();
        console.log(result[0]['extract']);
        for (var i = 0; i < result.length; i++) {
            $("#results").append("<a target='_blank' href=http://en.wikipedia.org/?curid=" + json.query.pages[i].pageid + ">" + "<div class='srResults'>" + "<h3>" + json.query.pages[i].title + "</h3>" + '<p>' + result[i]['extract'] + '</p>' + "</div>" + "</a>");

        }
    }
});
