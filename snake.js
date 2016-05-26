var snake = ['11_2', '10_2', '9_2'];
var direction = "r";
var speed = 120;
var food = "";
var score = 0;
var highscore = 0;

function init(){
 $('.contained').html("");
	for (var y = 0; y < 20; y++) {
		for (var x = 0; x < 30; x++) {
    $('.contained').append('<div class=square id=c_'+x+'_'+y+'></div>');
		}
  }	
  $('.contained').css('margin-left', 'auto')
    .css('margin-right', 'auto')
		.css('width', '450px');
  $('.square').css('width', '15px')
    .css('height', '15px')
    .css('float', 'left')
    .css('background-color', 'black')
		.css('padding', '0')
		.css('margin', '0px');
	
	snake = ['11_2', '10_2', '9_2'];
	direction = "r";
	speed = 120;
	food = "";
	score = 0;
	$('#score').html(score);
	$('#highscore').html(highscore);
	generateFood();
	$.each(snake, function(index, element){
		var elm = "c_"+element;
		$("#"+elm).addClass("snake");
	});
	setTimeout(function(){gameupdate()}, speed);
}

function generateFood(){
	var a = Math.floor(Math.random()*20);
	var b = Math.floor(Math.random()*30);
	food = ''+b+'_'+a;
	$('#c_'+b+'_'+a).addClass('foodstuff');
}

init();
	
function gameupdate(){
	var tail = snake.pop();
	$('#c_' +tail).removeClass('snake');
	var head = snake[0].split("_");
	var xdim = parseInt(head[0]);
	var ydim = parseInt(head[1]);
	switch (direction){
		case "r": xdim = xdim + 1; break;
		case "l": xdim = xdim - 1; break;
		case "u": ydim = ydim - 1; break;
		case "d": ydim = ydim + 1; break;
	}
	var newhead = "" +xdim+ "_" + ydim;
	if ($('.snake').hasClass('foodstuff')){
		snake.push(tail);
		$('#c_'+tail).addClass('snake');
		$('div').removeClass('foodstuff');
		score += 1;
		$('#score').html(score);
		if (score > highscore){
			highscore = score;
			$('#highscore').html(highscore);
		}
		generateFood();
	}
	snake.unshift(newhead);
	if (xdim<0 || ydim <0 || xdim > 29 || ydim > 19 || $('#c_'+ newhead).hasClass('snake')){
	init();
		return;
	}
	$('#c_'+newhead).addClass('snake');
	setTimeout(function(){gameupdate()}, speed);
}

$(document).keydown(function(e){                   
	switch(e.which) {
		case 37:
			if (direction != "r")
				direction = "l";
				break;
		case 38:
			if(direction != "d")
				direction = "u";
				break;
		case 39:
			if (direction != "l")
				direction = "r";
				break;
		case 40:
			if (direction != "u")
				direction = "d";
				break;
	}   
});	