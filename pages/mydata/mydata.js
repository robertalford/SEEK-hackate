define(['knockout', 'data/data'], function (ko, data) {
	function uniqueArray(array) {
		return [...new Set(array)]
	}

	const salarySteps = [0, 30, 40, 50, 60, 70, 80, 100, 120, 150, 200, "200+"]

	return function ViewModel(params) {
		this.mydata = ko.observable(data.mydata);

		this.filterPanel = {
			salaryMins: salarySteps.slice(0, salarySteps.length - 1),
			salaryMaxes: salarySteps.slice(1),
			selectedCompanyName: ko.observable(),
			selectedRoleFamily: ko.observable(),
			selectedRole: ko.observable(),
			selectedLocation: ko.observable(),
			selectedSalaryMin: ko.observable(0),
			selectedSalaryMax: ko.observable("200+"),
			selectedRecommended: ko.observable("All"),
			companyNames: ko.computed(() => {
				return uniqueArray(this.mydata().map(d => d.CompanyName))
			}),
			// roleFamilies: ko.computed(() => {
			// 	return uniqueArray(this.mydata().map(d => d.SubClassification))
			// }),
			// location: ko.computed(() => {
			// 	return uniqueArray(this.mydata().map(d => d.Location))
			// }),
			recommended: ['All', 'Recommended', 'Not recommended']
		};

		this.filterPanel.roleFamilies = ko.computed(() => {
			return uniqueArray(this.mydata().filter(d => 
				d.CompanyName === 'SEEK').map(d => d.SubClassification))
		});

		this.filterPanel.roles = ko.computed(() => {
			return uniqueArray(this.mydata().filter(d => 
				(d.CompanyName === 'SEEK') &&
				(d.SubClassification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily())).map(d => d.RoleClean))
		});

		this.filterPanel.location = ko.computed(() => {
			return uniqueArray(this.mydata().filter(d => 
				(d.CompanyName === 'SEEK') &&
				(d.SubClassification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily())).map(d => d.Location))
		});

		this.mydataFiltered = ko.computed(() => {
			return this.mydata().filter(r =>
				// (r.CompanyName === this.filterPanel.selectedCompanyName() || !this.filterPanel.selectedCompanyName()) &&
				(r.CompanyName === 'SEEK') &&
				(r.SubClassification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily()) &&
				(r.RoleClean === this.filterPanel.selectedRole() || !this.filterPanel.selectedRole()) &&
				(r.Location === this.filterPanel.selectedLocation() || !this.filterPanel.selectedLocation()) &&
				r.SalaryAmt >= this.filterPanel.selectedSalaryMin() * 1000 &&
				(r.SalaryAmt <= this.filterPanel.selectedSalaryMax() * 1000 || this.filterPanel.selectedSalaryMax() === "200+") &&
				(this.filterPanel.selectedRecommended() === "All" || r.Recommended === (this.filterPanel.selectedRecommended() === 'Recommended' ? true : false))
			)

		});
		

	}
});