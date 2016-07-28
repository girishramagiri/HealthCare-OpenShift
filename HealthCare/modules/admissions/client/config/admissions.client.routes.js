(function () {
  'use strict';

  angular
    .module('admissions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admissions', {
        abstract: true,
        url: '/admissions',
        template: '<ui-view/>'
      })
      .state('admissions.list', {
        url: '',
        templateUrl: 'modules/admissions/client/views/list-admissions.client.view.html',
        controller: 'AdmissionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Admissions List'
        }
      })
      .state('admissions.create', {
        url: '/create',
        templateUrl: 'modules/admissions/client/views/form-admission.client.view.html',
        controller: 'AdmissionsController',
        controllerAs: 'vm',
        resolve: {
          admissionResolve: newAdmission
        },
        data: {
          //roles: ['user', 'admin'],
          pageTitle : 'Admissions Create'
        }
      })
      .state('admissions.edit', {
        url: '/:admissionId/edit',
        templateUrl: 'modules/admissions/client/views/form-admission.client.view.html',
        controller: 'AdmissionsController',
        controllerAs: 'vm',
        resolve: {
          admissionResolve: getAdmission
        },
        data: {
          //roles: ['user', 'admin'],
          pageTitle: 'Edit Admission {{ admissionResolve.name }}'
        }
      })
      .state('admissions.view', {
        url: '/:admissionId',
        templateUrl: 'modules/admissions/client/views/view-admission.client.view.html',
        controller: 'AdmissionsController',
        controllerAs: 'vm',
        resolve: {
          admissionResolve: getAdmission
        },
        data:{
          pageTitle: 'Admission {{ articleResolve.name }}'
        }
      });
  }

  getAdmission.$inject = ['$stateParams', 'AdmissionsService'];

  function getAdmission($stateParams, AdmissionsService) {
    return AdmissionsService.get({
      admissionId: $stateParams.admissionId
    }).$promise;
  }

  newAdmission.$inject = ['AdmissionsService'];

  function newAdmission(AdmissionsService) {
    return new AdmissionsService();
  }
})();
