define(['knockout', 'data/data'], function (ko, data) {
    const salarySteps = [0, 30, 40, 50, 60, 70, 80, 100, 120, 150, 200, "200+"]

    function uniqueArray(array) {
        return [...new Set(array)]
    }

    return function ViewModel(params) {
        this.mydata = ko.observable(data.mydata);
        

        this.filterPanel = {
            salaryMins: salarySteps.slice(0, salarySteps.length - 1),
            salaryMaxes: salarySteps.slice(1),
            selectedCompanyName: ko.observable(),
            selectedRoleFamily: ko.observable(),
            selectedGender: ko.observable(),
            selectedRole: ko.observable(),
            selectedLocation: ko.observable(),
            selectedSalaryMin: ko.observable(0),
            selectedSalaryMax: ko.observable("200+"),
            selectedRecommended: ko.observable("All"),

            companyNames: ko.computed(() => {
                return uniqueArray(this.mydata().map(d => d.CompanyName))
            }),
            // roleFamilies: ko.computed(() => {
            //     return uniqueArray(this.mydata().map(d => d.SubClassification))
            // }),
            // location: ko.computed(() => {
            //     return uniqueArray(this.mydata().map(d => d.Location))
            // }),
            gender: ko.computed(() => {
                return uniqueArray(this.mydata().map(d => d.Gender))
            }),
            recommended: ['All', 'Recommended', 'Not recommended']
        };

        this.filterPanel.roleFamilies = ko.computed(() => {
            return uniqueArray(this.mydata().filter(d => 
                d.CompanyName === globallySetCompany).map(d => d.Classification)).sort()
        });

        this.filterPanel.location = ko.computed(() => {
            return uniqueArray(this.mydata().filter(d => 
                (d.CompanyName === globallySetCompany) &&
                (d.SubClassification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily())).map(d => d.Location)).sort()
        });        

        this.filterPanel.roles = ko.computed(() => {
            return uniqueArray(this.mydata().filter(d => d.SubClassification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily()).map(d => d.RoleClean))
        });

        this.mydataFiltered = ko.computed(() => {
            return this.mydata().filter(r =>
                (r.CompanyName === globallySetCompany) &&
                (r.Classification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily()) &&
                (r.RoleClean === this.filterPanel.selectedRole() || !this.filterPanel.selectedRole()) &&
                (r.Gender === this.filterPanel.selectedGender() || !this.filterPanel.selectedGender()) &&
                (r.Location === this.filterPanel.selectedLocation() || !this.filterPanel.selectedLocation()) &&
                r.AnnualisedSalary >= this.filterPanel.selectedSalaryMin() * 1000 &&
                (r.AnnualisedSalary <= this.filterPanel.selectedSalaryMax() * 1000 || this.filterPanel.selectedSalaryMax() === "200+") &&
                (this.filterPanel.selectedRecommended() === "All" || r.Recommended === (this.filterPanel.selectedRecommended() === 'Recommended' ? true : false))
            )
        });

        /*this.competitorsData - ko.computed(() => {
            if (!this.filterPanel.selectedRoleFamiliy()) {
                return [];
            }

            return this.mydata().filter(r => r.RoleFamily === this.filterPanel.selectedRoleFamily());
        });*/

        this.getReviewCount = ko.computed(() =>{
        	// if (!this.filterPanel.selectedCompanyName()) {
         //        return [];
         //    }

            var selectedCompanyNameReviews = this.mydata().filter(r => r.CompanyName === globallySetCompany);
            var reviewCount = selectedCompanyNameReviews.length;
            return reviewCount;
        });

        this.averageOverallScore = ko.computed(() => {
            // if (!this.filterPanel.selectedCompanyName()) {
            //     return [];
            // }

            var selectedCompanyNameReviews = this.mydata().filter(r => r.CompanyName === globallySetCompany);
            var overAllScore = doAverage(selectedCompanyNameReviews,"OverallRating");
            return  overAllScore;       
            
        });


        this.averageAllCompanyScore = ko.computed(() =>{
        	// if (!this.filterPanel.selectedCompanyName()) {
         //        return [];
         //    }

            //this.companyScoresObj = ko.observable();

            var selectedCompanyNameReviews = this.mydata().filter(r => r.CompanyName === globallySetCompany);
        	//var companyScores = [];
        	var companyScoresObj = {};
        	companyScoresObj.myAverages = {};

        	var careerDevOpp = doAverage(selectedCompanyNameReviews, "CareerDevOpp");
        	//companyScores.push(careerDevOpp);
        	companyScoresObj.careerDevOpp = careerDevOpp;
        	
        	var worklifeBal = doAverage(selectedCompanyNameReviews, "WorklifeBal");
        	//companyScores.push(worklifeBal);
        	companyScoresObj.worklifeBal = worklifeBal;

        	var management = doAverage(selectedCompanyNameReviews, "Management");
        	//companyScores.push(management);
        	companyScoresObj.management = management;
        	
        	var benefits = doAverage(selectedCompanyNameReviews, "Benefits");
        	//companyScores.push(benefits);
        	companyScoresObj.benefits = benefits;
        	
        	var diversity = doAverage(selectedCompanyNameReviews, "Diversity");
        	//companyScores.push(diversity);
        	companyScoresObj.diversity = diversity;
        	
        	var workingEnv = doAverage(selectedCompanyNameReviews, "WorkingEnv");
        	//companyScores.push(workingEnv);
        	companyScoresObj.workingEnv = workingEnv;
        	
        	
        	//var companyScoresObject = ko.toJSON(companyScoresObj);
        	

        	var companyScores = [];
        	companyScores.push(companyScoresObj);
        	//console.log(companyScores);

        	return companyScores;

        });
        //console.log(this.averageAllCompanyScore);
        function doAverage(objectArray,fieldToCalculate){
        	var curSum = 0;
            for (var i=0; i < objectArray.length; i++){
            	
            	curSum += objectArray[i][fieldToCalculate];
            }
            return curSum / objectArray.length;
        }

    }
});