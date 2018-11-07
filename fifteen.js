(function() {

    window.addEventListener("load", load);
    // variables
    var cr = 4;
    var x = 3;
    var y = 3;
    var i = 0;

    function load() {
        drawPuzzle();
    }
    

    function drawPuzzle() { //Function to create puzzle area
        var puzzleArea = document.getElementById("puzzlearea");
        var tile = puzzleArea.children;
        $("#shufflebutton").click(shuffle);

        for (var y = 0; y < cr; y++) {
            for (var x = 0; x < cr; x++) {
                tile[i].classList.add("puzzlepiece");
                tile[i].style.left = 100 * x + "px";
                tile[i].style.top = 100 * y + "px";
                tile[i].setAttribute("id", "xy(" + x + "," + y + ")");
                tile[i].onmouseover = highlight;
                tile[i].onmouseout = unhighlight;
                tile[i].onclick = clicktoMove;
                tile[i].style.backgroundPosition = (0 - 100 * x) + "px" + " " + (0 - 100 * y) + "px"; // use to style each individual tile with img.
                i++;
            }
        }
    }

    function shuffler(tile) {
        var tempY = y;
        var tempX = x;
        if (moveable(tile)) {
            x = parseInt(tile.style.left) / 100;
            y = parseInt(tile.style.top) / 100;
            tile.style.left = (tempX * 100) + "px";
            tile.style.top = (tempY * 100) + "px";
            tile.setAttribute("id", "xy(" + tempX + "," + tempY + ")");
        }
    }

    function shuffle() { //shuffle the tiles
        for (var i = 0; i < 1000; i++) {
            var area = getarea();
            var rand = parseInt(Math.random() * area.length);
            var tile = document.getElementById(area[rand]);
            shuffler(tile);
        }
    }

    function moveable(tile) {
        var area = getarea();
        if (area.indexOf(tile.getAttribute("id")) != -1) {
            return true;
        } else {
            return false;
        }
    }
    //Function to find coordinates of area tiles and assist in determining possible moves
    function getarea() {
        var up = "xy(" + x + "," + (y - 1) + ")";
        var down = "xy(" + x + "," + (y + 1) + ")";
        var right = "xy(" + (x - 1) + "," + y + ")";
        var left = "xy(" + (x + 1) + "," + y + ")";

        var area = [up, down, left, right];
        var moveableTile = [];

        for (var i = 0; i < area.length; i++) {
            if (document.getElementById(area[i]) != null) {
                moveableTile.push(area[i]);
            }
        }
        return moveableTile;
    }
    //Helper function  highlight movable piece
    function highlight() {
        if (moveable(this)) {
            this.classList.add("movablepiece");
        }
    }

    function unhighlight() {
        if (moveable(this)) {
            this.classList.remove("movablepiece");
        }

    }
    //Tile Movers
    function clicktoMove() {
        moveTile(this);
    }

    function moveTile(tile) {
        var tempY = y;

        var tempX = x;

        if (moveable(tile)) {
            x = parseInt(tile.style.left) / 100;
            y = parseInt(tile.style.top) / 100;
            tileAnimate(tile);
            tile.style.left = (tempX * 100) + "px";
            tile.style.top = (tempY * 100) + "px";
            tile.setAttribute("id", "xy(" + tempX + "," + tempY + ")");

        }

    }
     
     // Function to animate tile movement
    function tileAnimate(tile) {
        $(tile).fadeToggle(250);
        $(tile).fadeToggle(500);
    }


    

    

})();
