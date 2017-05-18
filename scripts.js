
(async function(){
	async function getData()
	{
		var response = await fetch('api/getdata.php');

		return await response.json();
	}

	// On page load, get initial data
	var data = await getData();

    ko.applyBindings(data);
	//$('.data').text(data);




	// // On page load, set inital page to home.html
	// $.get("pages/mydata.html", function(data){
 //    	$('.content').replaceWith(data);
	// });

	// // Change page, basedon menu item click
	// $("#mydata").click(function(){
 //    	$.get("pages/mydata.html", function(data){
 //    		$('.content').replaceWith(data);
	// 	});
	// 	getData();
	// });

	// $("#competitors").click(function(){
 //    	$.get("pages/competitors.html", function(data){
 //    		$('.content').replaceWith(data);
	// 	});
	// 	getData();
	// });	

})();


