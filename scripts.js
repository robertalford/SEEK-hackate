
$(document).ready(function(){

	function getData()
	{
	     var result = null;
	     var scriptUrl = "api/getdata.php"
	     $.ajax({
	        url: scriptUrl,
	        type: 'get',
	        success: function(data) {
	            $('.data').text(data);
	        } 
	     });
	}

	// On page load, get initial data
	getData();

	// On page load, set inital page to home.html
	$.get("pages/mydata.html", function(data){
    	$('.content').replaceWith(data);
	});

	// Change page, basedon menu item click
	$("#mydata").click(function(){
    	$.get("pages/mydata.html", function(data){
    		$('.content').replaceWith(data);
		});
		getData();
	});

	$("#competitors").click(function(){
    	$.get("pages/competitors.html", function(data){
    		$('.content').replaceWith(data);
		});
		getData();
	});	

});


