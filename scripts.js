requirejs.config({
	paths: {
		text: './node_modules/text/text',
		knockout: './node_modules/knockout/build/output/knockout-latest'
	}
});

var globallySetCompany = 'ANZ';

require(['knockout'], function (ko) {
	class NavigationViewModel {
		constructor() {
			this.currentPage = ko.observable("competitors");
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
		viewModel: { require: 'pages/mydata/chart' },
		template: { require: 'text!pages/mydata/chart.html' }
	});

	ko.components.register('heatmap', {
		viewModel: { require: 'pages/mydata/heatmap' },
		template: { require: 'text!pages/mydata/heatmap.html' }
	});

	ko.applyBindings(new NavigationViewModel());
});
