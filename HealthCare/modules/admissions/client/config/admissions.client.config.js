(function () {
  'use strict';

  angular
    .module('admissions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Admissions',
      state: 'admissions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'admissions', {
      title: 'List Admissions',
      state: 'admissions.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'admissions', {
      title: 'Create Admission',
      state: 'admissions.create',
      roles: ['user']
    });
  }
})();
