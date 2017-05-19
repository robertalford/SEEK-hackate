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
                (r.Classification === this.filterPanel.selectedRoleFamily() || !this.filterPanel.selectedRoleFamily()) &&
                (r.Gender === this.filterPanel.selectedGender() || !this.filterPanel.selectedGender()) &&
                (r.Location === this.filterPanel.selectedLocation() || !this.filterPanel.selectedLocation())
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

        this.recomendWorking = ko.computed(() =>{

        	var selectedCompanyNameReviews = this.mydata().filter(r => r.CompanyName === globallySetCompany);
        	var recommend = getRecomendWorking(selectedCompanyNameReviews);

        	return recommend;

        });

        this.salaryRating = ko.computed(()=>{

        	var selectedCompanyNameReviews = this.mydata().filter(r => r.CompanyName === globallySetCompany);
        	var salaryRatingAvg = calculateSalaryRating(selectedCompanyNameReviews);

        	return salaryRatingAvg;
        });

        this.getReviewsByRoleCount = ko.computed(()=>{
        	var selectedCompanyNameReviews = this.mydata().filter(r => r.CompanyName === globallySetCompany);

        	var rolesObj = {}

        	//Recorrer el array
        	//Agregar el rol si no existe en el objeto
        	//En un array agregar el numero de reviews, el valor de cada review y el promedio
        	for(var i = 0; i < selectedCompanyNameReviews.length; i++){

        		var curRev = selectedCompanyNameReviews[i];
        		
        		//if(inJSON(rolesObj, curRev.Role)){
        			if(rolesObj.hasOwnProperty(curRev.SubClassification)){
        			//console.log(curRev.Role);
        			
        			rolesObj[curRev.SubClassification].revCount += 1;
        			rolesObj[curRev.SubClassification].revRatings.push(curRev.OverallRating); 
        			//console.log(curRev.SubClassification, rolesObj[curRev.SubClassification].revCount);
        		}else {
        			//console.log(rolesObj);
        			rolesObj[curRev.SubClassification] = {};
        			rolesObj[curRev.SubClassification].revRatings = [];
        			rolesObj[curRev.SubClassification].revCount = 1;
        			rolesObj[curRev.SubClassification].revRatings.push(curRev.OverallRating);
        		}
        	}

        	
        	for(k in rolesObj) {
        		var revRatings = rolesObj[k].revRatings;
        		var sum = 0;
        		for(var i = 0; i < revRatings.length; i++){
        			sum += revRatings[i];
        		}
        		var avg = Math.round((sum / revRatings.length)*10) /10;
        		rolesObj[k].overAllRating = avg;
        	}
        	console.log(rolesObj);
        	return rolesObj;

        });

        this.displayRolesByRoleCount = ko.computed(() => {
        	var rolesByRoleCount = this.getReviewsByRoleCount();
        	var result = [];
        	var n = 5;
        	for (var key in rolesByRoleCount) {
        		result.push({
        			description: key,
        			revCount: rolesByRoleCount[key].revCount,
        			overAllRating: rolesByRoleCount[key].overAllRating
        		});
        	}

            result.sort((a,b) => b.revCount - a.revCount);


        	return result.slice(0, n);
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
        
        //Calculate Salary rating
        function calculateSalaryRating(reviewsArray){
        	var revSalGood = 0;
        	var revSalBad = 0;
        	var totalRec = 0;

        	for(var i = 0; i < reviewsArray.length; i++){
        		var curRev = reviewsArray[i];

        		if(curRev.SalaryRating === 'fair' || curRev.SalaryRating === 'generous') {// below, fair, generous
        			revSalGood += 1;
        		}else if(curRev.SalaryRating === 'below') {
        			revSalBad += 1;
        		}

        		totalRec += 1;
        	}

        	var avg = Math.floor((revSalGood / totalRec) * 100);
        	
        	return avg;
        }

        //GET THE % OF PEOPLE RECOMENDING WORKING THERE
        function getRecomendWorking(reviewArray){
        	var recYes = 0;
        	var recNo = 0;
        	var totalRec = 0;

        	for(var i = 0; i < reviewArray.length; i++){
        		var curRev = reviewArray[i];
        		if(curRev.Recommended === "FALSE"){
        			recNo += 1;
        		}else if(curRev.Recommended === "TRUE"){
        			recYes += 1;
        		}
        		totalRec += 1;
        		
        	}

        	var recommendWorkingHere = Math.floor((recYes / totalRec) * 100);
        	
        	return recommendWorkingHere;
        } 

        function doAverage(objectArray,fieldToCalculate){
        	var curSum = 0;
            for (var i=0; i < objectArray.length; i++){
            	
            	curSum += objectArray[i][fieldToCalculate];
            }
            return Math.round((curSum / objectArray.length) * 10 ) / 10;
        }        

    }
});