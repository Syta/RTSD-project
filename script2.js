$(document).ready(function(){
  
  $( ".dragga", this).dblclick(
  function() {
    $(".backImage", this).toggle();
  });
  
  $( ".dragga", this).click(
  function() {
	$(this).appendTo('#cards')
	$(".dragga").draggable({
	  cursor: 'pointer',
    });
  });
  
  $( "#shuffle").click(
	function () {
		var parent = $("#cards");
		var divs = parent.children();
		while (divs.length) {
			parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
		}
	});
	
	$( "#reset").click(
	function () {
		$("#cards").replaceWith(divClone.clone(true));
	});
	
	var divClone = $("#cards").clone(true);
});