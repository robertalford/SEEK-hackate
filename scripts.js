requirejs.config({
	paths: {
		text: './node_modules/text/text',
		knockout: './node_modules/knockout/build/output/knockout-latest'
	}
});

require(['knockout'], function (ko) {
	class NavigationViewModel {
		constructor() {
			this.currentPage = ko.observable("my-data");
		}

		navigate(page) {
			this.currentPage(page);
		}
	}

	ko.components.register('my-data', {
		viewModel: { require: 'pages/mydata/mydata' },
		template: { require: 'text!pages/mydata/mydata.html' }
	});

	ko.components.register('competitors', {
		viewModel: { require: 'pages/competitors/competitors' },
		template: { require: 'text!pages/competitors/competitors.html' }
	});

	ko.components.register('chart', {
		template: { require: 'text!pages/mydata/chart.html' }
	});

	ko.applyBindings(new NavigationViewModel());
});
