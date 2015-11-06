var Board = {
  hexSize: 30,
  firstHexX: 50,
  firstHexY: 50,
  offset: 5,

  width: undefined,
  height: undefined,

  buildBoard: function (width, height) {
    this.width = width;
    this.height = height;
    this.hexArray = [];
    for (var j = 0; j < this.height; j++) {
      this.hexArray[j] = [];
      for (var i = 0; i < this.width; i++) {
        var newHex = Object.create(Hex);
      	newHex.centre = { x: this.calculateHexCentreX(i, j),
  					              y: this.calculateHexCentreY(j) };
        var corners = [];
		    for (var c = 0; c < 6; c++) {
  			  corners[c] = this.calculateHexCorner(newHex.centre, c);
		    }
	    newHex.corners = corners;
	    this.hexArray[j][i] = newHex;
      }
    }

  	//set up neighbours
  	for (var j = 0; j < this.height; j++) {
        for (var i = 0; i < this.width; i++) {
          var hex = this.hexArray[j][i];
  		hex.neighbours = this.calculateHexNeighbours(i, j);
  		hex.regionName = "x:" + i + " y:" + j;
        }
      }

  	//set up colours
  	if (!this.getHexAt(0,0).findColour()) {
  		alert("no board possible; change parameters!");
  	}
  },

  drawBoard: function (ctx) {
    for (var j = 0; j < this.height; j++) {
      for (var i = 0; i < this.width; i++) {
        this.hexArray[j][i].draw(ctx);
      }
    }
  },

  getHexAt: function (x, y) {
    if (this.isValidCoordinate(x, y)) {
      return this.hexArray[y][x];
    }
  },

  calculateHexCentreY: function (j) {
    return this.firstHexY + j * (this.hexSize + this.offset) * 1.5;
  },

  calculateHexCentreX: function (i, j) {
    var x = this.firstHexX + i * (this.hexSize + this.offset) * Math.sqrt(3);
    if (j&1) {
      x += this.hexSize;
    }
    return x;
  },

  calculateHexCorner: function (centre, i) {
    var point = {};
    var angle_deg = 60 * i + 30;
    var angle_rad = Math.PI / 180 * angle_deg;
    point.x = centre.x + this.hexSize * Math.cos(angle_rad);
    point.y = centre.y + this.hexSize * Math.sin(angle_rad);
    return point;
  },

  isValidCoordinate: function (x,y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  },

  calculateHexNeighbours: function (x,y) {
	var leftOrRight = y&1 ? 1 : -1;
	var neighbours = [	[x-1, y],
          						[x+1, y],
          						[x, y-1],
          						[x, y+1],
          						[x+leftOrRight, y+1],
          						[x+leftOrRight, y-1]  ];
	var result = [];
	for (var n=0; n<6; n++) {
		var hex = this.getHexAt(neighbours[n][0], neighbours[n][1]);
		if (hex) {
			result.push(hex);
		}
	}
	return result;
  }
}
