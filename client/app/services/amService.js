app.factory('amService', [ '$mdSidenav', '$mdToast', function ($mdSidenav, $mdToast) {
    var service = {};

    service.ToastSimple = function (texto) {
        $mdToast.show(
        $mdToast.simple()
            .textContent(texto)
            .position('top right' )
            .hideDelay(3000)
        );
    };
    //Pendiente de averiguar como se puede customizar correctamente una Toast
    /*service.ToastSuccess = function (texto) {
        
        $mdToast.show(
        {
            template: '<md-toast class="md-toast md-toast-success">' + texto + '</md-toast>',
            hideDelay: 3000,
            position: 'top right'
        }
        );
        
    };*/

    return service;
}])