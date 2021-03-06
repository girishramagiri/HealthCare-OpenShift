(function () {
  'use strict';

  // Admissions controller
  angular
    .module('admissions')
    .controller('AdmissionsController', AdmissionsController);

  AdmissionsController.$inject = ['$scope', '$state', 'Authentication', 'admissionResolve', 'PatientsService', 'InsuranceService'];

  function AdmissionsController ($scope, $state, Authentication, admission, PatientsService, InsuranceService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.admission = admission;
    vm.patients = PatientsService.query();
    vm.selectedPatientDetails = '';
    vm.patientSelected = false;
    vm.setPatientDetails = setPatientDetails;
    vm.processInsurance = processInsurance;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

	// Set Patient Details
    function setPatientDetails(patientid) {    
      if(patientid === 0) {
        vm.selectedPatientDetails = '';
        vm.patientSelected = false;
      } else {
        vm.patientSelected = true;
        for(var i = 0; i < vm.patients.length; i++) {
          if(vm.patients[i].patientid === patientid) {
            vm.selectedPatientDetails = vm.patients[i];
            vm.admission.insuranceid = vm.selectedPatientDetails.insuranceid;
          }
        } 
      }
    }
	
    //Validate Insurance ID
    function processInsurance(insuranceId) {
      InsuranceService.processInsurance(insuranceId).then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
    }
	
	// Remove existing Admission
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.admission.$remove($state.go('admissions.list'));
      }
    }
	
	// Save Admission
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.admissionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.admission._id) {
        vm.admission.$update(successCallback, errorCallback);
      } else {
        vm.admission.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admissions.view', {
          admissionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
