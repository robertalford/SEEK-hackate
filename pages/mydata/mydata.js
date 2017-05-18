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
        	roles: ko.computed(() => {
        		return uniqueArray(this.mydata().map(d => d.RoleClean))
        	}),
        	location: ko.computed(() => {
        		return uniqueArray(this.mydata().map(d => d.Location))
        	}),        	
        	selectedCompanyName: ko.observable(),
        	selectedRole: ko.observable(),
        	selectedLocation: ko.observable()
        };

        this.mydataFiltered = ko.computed(() => {
        	return this.mydata().filter(r => 
        		(r.CompanyName === this.filterPanel.selectedCompanyName() || !this.filterPanel.selectedCompanyName()) &&
        		(r.RoleClean === this.filterPanel.selectedRole() || !this.filterPanel.selectedRole()) &&
        		(r.Location === this.filterPanel.selectedLocation() || !this.filterPanel.selectedLocation()))
        });
    }
});