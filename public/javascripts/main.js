$(document).ready(function(){

    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    var board = Object.create(Board);
    board.buildBoard(10,10);
    board.drawBoard(ctx);

    var deck = Object.create(Deck);
    deck.buildDeck(board.hexArray);
});
