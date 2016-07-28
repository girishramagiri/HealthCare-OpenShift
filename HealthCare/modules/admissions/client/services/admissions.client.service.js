//Admissions service used to communicate Admissions REST endpoints
(function () {
  'use strict';

  angular
    .module('admissions')
    .factory('AdmissionsService', AdmissionsService);

  AdmissionsService.$inject = ['$resource'];

  function AdmissionsService($resource) {
    return $resource('api/admissions/:admissionId', {
      admissionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
