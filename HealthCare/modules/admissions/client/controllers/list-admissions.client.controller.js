(function () {
  'use strict';

  angular
    .module('admissions')
    .controller('AdmissionsListController', AdmissionsListController);

  AdmissionsListController.$inject = ['AdmissionsService'];

  function AdmissionsListController(AdmissionsService) {
    var vm = this;

    vm.admissions = AdmissionsService.query();
  }
})();
