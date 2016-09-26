app.controller('escrituraCtrl', function($scope, $http, $routeParams, $location) {
    function obtenerLibro() {
        $http.get($scope.serverUrl + "api/libros/" + $routeParams.id).then(function(response) {
            $scope.libro = response.data;
            //Comprobamos si recibimos el idCapitulo para situarnos en el, si no nos situamos en el último
            if($routeParams.idCapitulo != null && $routeParams.idCapitulo != undefined){
                for (var i = 0; i < $scope.libro.capitulos.length; i++) {
                    if ($scope.libro.capitulos[i]._id == $routeParams.idCapitulo) {
                        $scope.capitulo = $scope.libro.capitulos[i];
                        $scope.indexCapitulo = i;
                        break;
                    }
                }
            }else{
                $scope.indexCapitulo = $scope.libro.capitulos.length-1;
                $scope.capitulo = $scope.libro.capitulos[$scope.libro.capitulos.length-1];
            }
            $scope.tinymceModel = $scope.capitulo.contenido;
            
            initTinymce();
        }, function (error) {
            alert(error);
        });
    }

    function initTinymce(){
        $scope.tinymceOptions = {
            selector: "[tinymce]",
            plugins: ["code"],
            menubar: false,
            toolbar1: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify styleselect   bullist numlist outdent indent blockquote undo redo removeformat subscript superscript | code",
        };
    }

    $scope.anterior = function(){
        if($scope.indexCapitulo > 0){
            $scope.indexCapitulo--;
            $location.path("/escritura/"+$scope.libro._id+"/" + $scope.libro.capitulos[$scope.indexCapitulo]._id);
        }
    }

    $scope.siguiente = function(){
        if($scope.indexCapitulo < $scope.libro.capitulos.length-1){
            $scope.indexCapitulo++;
            $location.path("/escritura/"+$scope.libro._id+"/" + $scope.libro.capitulos[$scope.indexCapitulo]._id);
        }
    }

    $scope.guardarLibro = function (libro) {
        $scope.capitulo.contenido = $scope.tinymceModel;

        $http.post($scope.serverUrl + "api/libros/"+$scope.libro._id, $scope.libro).then(function(response) {
            $location.path("/editar/" + $scope.libro._id);
        }, function (error) {
            alert(error);
        });
    }

    function inicializar() {
        $scope.indexCapitulo = 0;
        obtenerLibro();
    }

    inicializar();    
});