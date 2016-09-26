app.controller('catalogoCtrl', function($scope, $http, $location, $mdDialog) {
    $scope.titulo="Catálogo";

    $scope.verDetalle = function(ev, libro) {

        $mdDialog.show({
            controller: libroDetalleCtrl,
            templateUrl: '../../views/modals/libroDetalleModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            locals: {
                libro: libro
            }
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }

    function libroDetalleCtrl($scope, $mdDialog, libro) {
        $scope.libro = libro;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.leerLibro = function(id) {
            $mdDialog.hide();
            $location.path("/lectura/" + id);
        };
        $scope.editarLibro = function(id) {
            $mdDialog.hide();
            $location.path("/editar/" + id);
        };
        $scope.escribirLibro = function(id) {
            $mdDialog.hide();
            $location.path("/escritura/" + id);
        };
    }

    function obtenerCatalogo() {
        $http.get($scope.serverUrl + "api/libros").then(function(response) {
            $scope.catalogo = response.data;
        }, function (error) {
            alert(error);
        });
    }

    function inicializar() {
        obtenerCatalogo();
    }

    inicializar();

});