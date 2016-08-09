(function () {
  'use strict';

  angular
    .module('admissions')
    .factory('InsuranceService', InsuranceService);

  InsuranceService.$inject = ['$http', '$q'];

  function InsuranceService($http, $q) {
    // InsuranceService service logic
    // ...

    // Public API
    return {
      processInsurance: function (insuranceId) {
        console.log('inside InsuranceService: '+insuranceId);
        var deferred = $q.defer();
        var result = {};
        var processInsuranceURL = 'api/admissions/insurance/'+insuranceId;
        $http.get(processInsuranceURL).then(function (response) {
          result = response;
          deferred.resolve(result);
        }, function (response) {
          deferred.reject(response);  
        });
        return deferred.promise;
      }
    };
  }
})();
