window.AngularAppService = angular.module('AngularAppService', []);
window.AngularAppDirectives = angular.module('AngularAppDirectives', []);
window.AngularAppFilter = angular.module('AngularAppFilter', []);
window.AngularAppAnimations = angular.module('AngularAppAnimations', []);
window.AngularApp = angular.module('AngularApp', ['AngularAppService', 'AngularAppDirectives', 'AngularAppFilter', 'ngRoute', 'angular-blocks', 'ui.bootstrap', 'AngularAppAnimations']);
