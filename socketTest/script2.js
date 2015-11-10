$(document).ready(function(){
  
  $( ".dragga", this).dblclick(
  function() {
    $(".backImage", this).toggle();
  });
  
  $( ".dragga", this).click(
  function() {
	$(this).appendTo('#cards')
  });
  
  $(".dragga").draggable({
	  cursor: 'pointer',
  });
  
  $( "button").click(
	function () {
		var parent = $("#cards");
		var divs = parent.children();
		while (divs.length) {
			parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
		}
	});
});
