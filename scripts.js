requirejs.config({
	paths: {
		text: './node_modules/text/text',
		knockout: './node_modules/knockout/build/output/knockout-latest'
	}
});

require(['knockout'], function (ko) {

	ko.components.register('my-data', {
		viewModel: { require: 'pages/mydata' },
		template: { require: 'text!pages/mydata.html' }
	});
	
	ko.applyBindings();

	// (async function () {
	// 	async function getData() {
	// 		return {
	// 			mydata: [
	// 				{ CompanyName: "Telstra" }
	// 			]
	// 		};
	// 		// var response = await fetch('api/getdata.php');

	// 		// return await response.json();
	// 	}

	// 	// On page load, get initial data
	// 	var data = await getData();

	// 	//$('.data').text(data);




	// 	// // On page load, set inital page to home.html
	// 	// $.get("pages/mydata.html", function(data){
	// 	//    	$('.content').replaceWith(data);
	// 	// });

	// 	// // Change page, basedon menu item click
	// 	// $("#mydata").click(function(){
	// 	//    	$.get("pages/mydata.html", function(data){
	// 	//    		$('.content').replaceWith(data);
	// 	// 	});
	// 	// 	getData();
	// 	// });

	// 	// $("#competitors").click(function(){
	// 	//    	$.get("pages/competitors.html", function(data){
	// 	//    		$('.content').replaceWith(data);
	// 	// 	});
	// 	// 	getData();
	// 	// });	

	// })();


});
