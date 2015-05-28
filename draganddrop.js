var object1 = document.getElementById('object1');
var object2 = document.getElementById('object2');
var object3 = document.getElementById('object3');
var object4 = document.getElementById('object4');
var object5 = document.getElementById('object5');
var object6 = document.getElementById('object6');
var object7 = document.getElementById('object7');
var object8 = document.getElementById('object8');

var objArray = ['#object1', '#object2', '#object3', '#object4', '#object5', '#object6', '#object7', '#object8'];
//var targArray = ['#target1', '#target2', '#target3', '#target4', '#target5'];
var startDrag = '';
var resetter = 0;
//var draggable = ui.draggable;

//jQ
var j = jQuery.noConflict();
j(document).ready(function()
{
//draggin
j('#object1, #object2, #object3, #object4, #object5, #object6, #object7, #object8').draggable
({
start: function(event,ui) {
startDrag = ui.position;
//console.log(startDrag);
},
	containment: '#main',
	cursor: 'move',
	//snap: '#target1',
	//snapMode: 'inner',
	//snapTolerance: 35,
	//revert: wrong,//call the wrong function on revert
	//revert: true,
	revert: function(valid)
		{
		if(!valid)
			{
			//this.remove();
			j('#feedback').html('<h3>Inténtalo de nuevo!</h3>');
			return true;
			}
		},	
	stack: 'div',//bring it to the top by adjusting z-index of the element
	drag: clearer,
	stop: function(event,ui)
		{
		//console.log("finished");
		}
	});
	
//droppables	
j('#one').droppable
	({
	drop: right,
	accept: '#object4 , #object8'
	//tolerance: intersect
	});
j('#two').droppable
	({
	drop: right,
	accept: '#object6 , #object1 , #object7, #object3'
	});
	
j('#three').droppable
	({
	drop: right,
	accept: '#object2 , #object5'
	});

});//end on doc load

//EXTERNAL METHODS

//clear the feedback div onDrag
function clearer(event, ui)
{ j('#feedback').html(''); }

//if the dropTarget is correct
function right(event, ui)
{
j('#feedback').html('<h3>Es correcto !</h3>');
var draggable = ui.draggable;
draggable.draggable('disable');
draggable.draggable('option', 'revert', false);//turn revert off
//draggable.offset(j(this).offset());//lock it on top of the targets x and y
draggable.css('background-color','#ffffff');
draggable.css('color','#09C');
resetter++;
if (resetter == 8)
	{
	//console.log(resetter);
	j('#feedback').html('<h3 class="greentext">Felicitaciones, lo has conseguido !</h3>');
	j('#logo').html('<button type="button" onclick="resetIt()">Reset</button>');
	}
else
	{
	//do nothing
	}
}

//on reset button click
function resetIt() {
resetter = 0;
j('#feedback').html('');
j('#logo').html('<img src="http://ontrack-media.net/PSSC/images/PS_globe_icon.png" alt="logo" height="50px" width="50px">');
//console.log(objArray);
for (x = 0; x < objArray.length; x++)
	{
	j(objArray[x]).css('left', '0');
	j(objArray[x]).css('top', '0');
	//j(objArray[x]).css('float', 'left');
	j(objArray[x]).css('background-color', '#09C');
	j(objArray[x]).css('color','#fff');
	j(objArray[x]).draggable('enable');//re-enable the draggable state
	j(objArray[x]).draggable({revert: function(valid) //gotta recall the revert function
		{
		if(!valid)
			{
			//this.remove();
			j('#feedback').html('<h3>Try again!</h3>');
			return true;
			}
		}
		});
	}
}