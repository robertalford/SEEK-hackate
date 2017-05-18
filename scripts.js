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
	
});
