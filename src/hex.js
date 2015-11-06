var Hex = {
  colourCode: undefined,
  regionName: undefined,

  centre: undefined,
  corners: undefined,
  neighbours: [],

  colourMap: [	"#FFFFFF",
				        "#78FF78",
        				"#CBBC91",
        				"#FFD1DC",
        				"#FDFD7D",
        				"#96CAFD",
        				"#FFB347",
        				"#BF94E4"	 ],

  draw: function (ctx) {
  	ctx.fillStyle = this.colourCode!==undefined ? Hex.colourMap[this.colourCode] : "#000000";
	  ctx.beginPath();
    ctx.moveTo(this.corners[0].x, this.corners[0].y);
    for (var i = 1; i <= 5; i++) {
      ctx.lineTo(this.corners[i].x, this.corners[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  },

  findColour: function () {
	//recursively picks random colours based on neighbours (no colour matches within two hexes)

	//find invalid colours based on neighbours
	var invalid = [];
	for (var i=0; i<this.neighbours.length; i++) {
		var hex = this.neighbours[i];
		if (hex.colourCode!==undefined) {
			invalid[hex.colourCode] = true;
		}
		for (var j=0; j<hex.neighbours.length; j++) {
			var nHex = hex.neighbours[j];
			if (nHex.colourCode!==undefined) {
				invalid[nHex.colourCode] = true;
			}
		}
	}
	//build valid list
	var valid = [];
	for (var i=0; i<Hex.colourMap.length; i++) {
		if (!invalid[i]) {
			valid.push(i);
		}
	}

	//try random valid entries until one works or there are none left
	while (valid.length>0) {
		var index = Math.floor(Math.random() * valid.length);
		this.colourCode = valid[index];

		//find colours for all unset neighbours
		var success = true;
		for (var i=0; i<this.neighbours.length; i++) {
			var hex = this.neighbours[i];
			if (hex.colourCode===undefined) {
				success = hex.findColour();
			}
			if (!success) {
				break;
			}
		}
		if (success) {
			return true;
		} else {
			//current test was not valid; remove from valid list
			valid.splice(index,1);
		}
	}
	//no remaining valid options; caller must try a different colour
	this.colourCode = undefined;
	return false;
  }
};
