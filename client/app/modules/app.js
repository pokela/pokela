var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial','ui.tinymce']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/login', {
        controller: 'loginCtrl',
        templateUrl: 'views/login.html',
        hideMenus: true
    })
    .when('/registro', {
        templateUrl: 'views/registro.html',
        controller : "registroCtrl",
        hideMenus: true
    })
    .when('/', {
        controller: 'homeCtrl',
        templateUrl: 'views/home.html'
    })
    .when("/", {
        templateUrl : "views/catalogo.html",
        controller : "catalogoCtrl"
    })
    .when("/biblioteca", {
        templateUrl : "views/biblioteca.html",
        controller : "bibliotecaCtrl"
    })
    .when("/cuenta", {
        templateUrl : "views/cuenta.html",
        controller : "cuentaCtrl"
    })
    .when("/lectura/:id", {
        templateUrl : "views/lectura.html",
        controller : "lecturaCtrl"
    })
    .when("/lectura/:id/:idCapitulo", {
        templateUrl : "views/lectura.html",
        controller : "lecturaCtrl"
    })
    .when("/escritura/:id", {
        templateUrl : "views/escritura.html",
        controller : "escrituraCtrl"
    })
    .when("/escritura/:id/:idCapitulo", {
        templateUrl : "views/escritura.html",
        controller : "escrituraCtrl"
    })
    .when("/nuevo", {
        templateUrl : "views/gestionLibro.html",
        controller : "gestionLibroCtrl"
    })
    .when("/editar/:id", {
        templateUrl : "views/gestionLibro.html",
        controller : "gestionLibroCtrl"
    })
    .when("/test", {
        templateUrl : "views/test.html",
        controller : "testCtrl"
    })

    .otherwise({ redirectTo: '/login' });

    $locationProvider.html5Mode(true);

});

app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            // Descomentar para tener autentificación básica en los servicios
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if (($location.path() !== '/login' && $location.path() !== '/registro') && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
