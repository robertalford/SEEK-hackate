define(['knockout', 'data/data'], function (ko, data) {
	function uniqueArray(array) {
		return [...new Set(array)]
	}

	const salarySteps = [0, 30, 40, 50, 60, 70, 80, 100, 120, 150, 200, "200+"]


	return function ViewModel(params) {
		this.mydata = ko.observable(data.mydata);

		this.tableData = [
			{rowHeading: '', values: ['You', 'Aus', 'Comp 1','Comp 2', 'Comp 3']},
			{rowHeading: 'Overall', values: [4, 3, 4, 2,3]},
			{rowHeading: 'Career Development', values: [4, 4, 4,2,3]},
			{rowHeading: 'Worklife Balance', values: [4, 3, 2,2,3]},
			{rowHeading: 'Management', values: [5, 4, 3,1,3]},
			{rowHeading: 'Benefits & Perks', values: [3, 3, 4,2,5]},
			{rowHeading: 'Diverstiy', values: [4, 3, 2,3,4]},
			{rowHeading: 'Recommend working there', values: ['65%', '55%', '13%', '70%','64%']}
		]

		this.filterPanel = {
			salaryMins: salarySteps.slice(0, salarySteps.length - 1),
			salaryMaxes: salarySteps.slice(1),
			selectedCompanyName: ko.observable(),
			selectedRoleFamily: ko.observable(),
			selectedKeywords: ko.observable("").extend({ratelimit: {method: "notifyWhenChangesStop", timeout: 1000}}),
			selectedRole: ko.observable(),
			selectedTheme: ko.observable(),
			selectedLocation: ko.observable(),
			selectedGender: ko.observable(),
			selectedSalaryMin: ko.observable(0),
			selectedSalaryMax: ko.observable("200+"),
			selectedRecommended: ko.observable("All"),
			companyNames: ko.computed(() => {
				return uniqueArray(this.mydata().map(d => d.CompanyName))
			}),
			gender: ko.computed(() => {
				return uniqueArray(this.mydata().map(d => d.Gender))
			}),
			recommended: ['All', 'Recommended', 'Not recommended']
		};

		this.filterPanel.selectedKeywordsRatelimited = ko.pureComputed(this.filterPanel.selectedKeywords).extend({ratelimit: {method: "notifyWhenChangesStop", timeout: 1000}}),


		this.filterPanel.roleFamilies = ko.computed(() => {
			return uniqueArray(this.mydata().filter(d => 
				d.CompanyName === globallySetCompany).map(d => d.Classification)).sort()
		});

		this.filterPanel.theme = ko.computed(() => {
			return uniqueArray(this.mydata().filter(d => 
				d.CompanyName === globallySetCompany).map(d => d.Theme1)).sort()
		});

		this.filterPanel.roles = ko.computed(() => {
			return uniqueArray(this.mydata().filter(d => 
				(d.CompanyName === globallySetCompany) &&
				(d.Classification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily())).map(d => d.SubClassification)).sort()
		});

		this.filterPanel.location = ko.computed(() => {
			return uniqueArray(this.mydata().filter(d => 
				(d.CompanyName === globallySetCompany) &&
				(d.Classification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily())).map(d => d.Location)).sort()
		});

		this.mydataFiltered = ko.computed(() => {
			return this.mydata().filter(r =>
				// (r.CompanyName === this.filterPanel.selectedCompanyName() || !this.filterPanel.selectedCompanyName()) &&
				(r.CompanyName === globallySetCompany) &&
				(r.Classification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily()) &&
				(r.SubClassification === this.filterPanel.selectedRole() || !this.filterPanel.selectedRole()) &&
				(getText(r).indexOf(this.filterPanel.selectedKeywordsRatelimited()) !== -1) &&
				(r.Location === this.filterPanel.selectedLocation() || !this.filterPanel.selectedLocation()) &&
				(r.Theme1 === this.filterPanel.selectedTheme() || !this.filterPanel.selectedTheme()) &&
				(r.Gender === this.filterPanel.selectedGender() || !this.filterPanel.selectedGender()) &&
				((r.SalaryAmt >= this.filterPanel.selectedSalaryMin() * 1000 
				&&
				(r.SalaryAmt <= this.filterPanel.selectedSalaryMax() * 1000 || this.filterPanel.selectedSalaryMax() === "200+")) || r.SalaryAmt === "NA") &&
				(this.filterPanel.selectedRecommended() === "All" || r.Recommended === (this.filterPanel.selectedRecommended() === 'Recommended' ? true : false))
			)

		});
		

	}
});

function getText(obj) {
	return obj.Pros + obj.Cons + obj.ExperienceSummary;
}