requirejs.config({
	paths: {
		text: './node_modules/text/text',
		knockout: './node_modules/knockout/build/output/knockout-latest'
	}
});

require(['knockout'], function (ko) {

	ko.components.register('my-data', {
		viewModel: { require: 'pages/mydata/mydata' },
		template: { require: 'text!pages/mydata/mydata.html' }
	});

	ko.components.register('chart', {
		template: { require: 'text!pages/mydata/chart.html' }
	});
	
	ko.applyBindings();
});
