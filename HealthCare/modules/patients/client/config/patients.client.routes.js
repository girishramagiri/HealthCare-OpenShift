(function () {
  'use strict';

  angular
    .module('patients')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('patients', {
        abstract: true,
        url: '/patients',
        template: '<ui-view/>'
      })
      .state('patients.list', {
        url: '',
        templateUrl: 'modules/patients/client/views/list-patients.client.view.html',
        controller: 'PatientsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Patients List'
        }
      })
      .state('patients.create', {
        url: '/create',
        templateUrl: 'modules/patients/client/views/form-patient.client.view.html',
        controller: 'PatientsController',
        controllerAs: 'vm',
        resolve: {
          patientResolve: newPatient
        },
        data: {
          //roles: ['user', 'admin'],
          pageTitle : 'Patients Create'
        }
      })
      .state('patients.edit', {
        url: '/:patientId/edit',
        templateUrl: 'modules/patients/client/views/form-patient.client.view.html',
        controller: 'PatientsController',
        controllerAs: 'vm',
        resolve: {
          patientResolve: getPatient
        },
        data: {
          //roles: ['user', 'admin'],
          pageTitle: 'Edit Patient {{ patientResolve.name }}'
        }
      })
      .state('patients.view', {
        url: '/:patientId',
        templateUrl: 'modules/patients/client/views/view-patient.client.view.html',
        controller: 'PatientsController',
        controllerAs: 'vm',
        resolve: {
          patientResolve: getPatient
        },
        data:{
          pageTitle: 'Patient {{ articleResolve.name }}'
        }
      });
  }

  getPatient.$inject = ['$stateParams', 'PatientsService'];

  function getPatient($stateParams, PatientsService) {
    return PatientsService.get({
      patientId: $stateParams.patientId
    }).$promise;
  }

  newPatient.$inject = ['PatientsService'];

  function newPatient(PatientsService) {
    return new PatientsService();
  }
})();
