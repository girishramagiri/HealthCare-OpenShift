(function () {
  'use strict';

  describe('Admissions Route Tests', function () {
    // Initialize global variables
    var $scope,
      AdmissionsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AdmissionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AdmissionsService = _AdmissionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admissions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/admissions');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          AdmissionsController,
          mockAdmission;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('admissions.view');
          $templateCache.put('modules/admissions/client/views/view-admission.client.view.html', '');

          // create mock Admission
          mockAdmission = new AdmissionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Admission Name'
          });

          //Initialize Controller
          AdmissionsController = $controller('AdmissionsController as vm', {
            $scope: $scope,
            admissionResolve: mockAdmission
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:admissionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.admissionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            admissionId: 1
          })).toEqual('/admissions/1');
        }));

        it('should attach an Admission to the controller scope', function () {
          expect($scope.vm.admission._id).toBe(mockAdmission._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/admissions/client/views/view-admission.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AdmissionsController,
          mockAdmission;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admissions.create');
          $templateCache.put('modules/admissions/client/views/form-admission.client.view.html', '');

          // create mock Admission
          mockAdmission = new AdmissionsService();

          //Initialize Controller
          AdmissionsController = $controller('AdmissionsController as vm', {
            $scope: $scope,
            admissionResolve: mockAdmission
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.admissionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admissions/create');
        }));

        it('should attach an Admission to the controller scope', function () {
          expect($scope.vm.admission._id).toBe(mockAdmission._id);
          expect($scope.vm.admission._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/admissions/client/views/form-admission.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AdmissionsController,
          mockAdmission;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admissions.edit');
          $templateCache.put('modules/admissions/client/views/form-admission.client.view.html', '');

          // create mock Admission
          mockAdmission = new AdmissionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Admission Name'
          });

          //Initialize Controller
          AdmissionsController = $controller('AdmissionsController as vm', {
            $scope: $scope,
            admissionResolve: mockAdmission
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:admissionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.admissionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            admissionId: 1
          })).toEqual('/admissions/1/edit');
        }));

        it('should attach an Admission to the controller scope', function () {
          expect($scope.vm.admission._id).toBe(mockAdmission._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/admissions/client/views/form-admission.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
