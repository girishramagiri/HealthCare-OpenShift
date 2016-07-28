(function () {
  'use strict';

  // Patients controller
  angular
    .module('patients')
    .controller('PatientsController', PatientsController);

  PatientsController.$inject = ['$scope', '$state', 'Authentication', 'patientResolve'];

  function PatientsController ($scope, $state, Authentication, patient) {
    var vm = this;

    vm.authentication = Authentication;
    vm.patient = patient;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Patient
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.patient.$remove($state.go('patients.list'));
      }
    }

    // Save Patient
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.patientForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.patient._id) {
        vm.patient.$update(successCallback, errorCallback);
      } else {
        vm.patient.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('patients.view', {
          patientId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
