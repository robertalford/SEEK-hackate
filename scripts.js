
(async function(){
	async function getData()
	{
		var response = await fetch('data/data.json');

		return await response.json();
	}

	// On page load, get initial data
	var data = await getData();

    ko.applyBindings(data);

})();


