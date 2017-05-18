function uniqueArray(array) {
	return [...new Set(array)]
}

define(['knockout', 'data/data'], function(ko, data) {
    return function ViewModel(params) {
        this.mydata = ko.observable(data.mydata);

        this.filterPanel = {
        	companyNames: ko.computed(() => {
        		return uniqueArray(this.mydata().map(d => d.CompanyName))
        	}),
        	selectedCompanyName: ko.observable()
        };

        this.mydataFiltered = ko.computed(() => {
        	return this.mydata().filter(r => r.CompanyName === this.filterPanel.selectedCompanyName())
        });
    }
});