define(['knockout', 'data/data'], function(ko, data) {
    return function ViewModel(params) {
        this.mydata= data.mydata
    }
});