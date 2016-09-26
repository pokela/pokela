app.controller('gestionLibroCtrl', function($scope, $http, $routeParams, $location, $mdDialog) {

    $scope.nuevoCapitulo = function (ev) {
        var nuevoCapitulo = new Capitulo();
        nuevoCapitulo._autor = $scope.globals.currentUser.userInfo._id;
        mostrarVentanaEdicionCapitulo(ev, $scope.libro, nuevoCapitulo, !($routeParams.id != null && $routeParams.id != undefined));
    }

    $scope.editarCapitulo = function (ev, capitulo){
        mostrarVentanaEdicionCapitulo(ev, $scope.libro, capitulo, !($routeParams.id != null && $routeParams.id != undefined));
    }

    $scope.guardar = function (){
        //Comprobamos si es un libro nuevo o estamos editando
        if($routeParams.id != null && $routeParams.id != undefined){
            $http.post($scope.serverUrl + "api/libros/"+$scope.libro._id, $scope.libro).then(function(response) {
                $scope.libro = response.data;
                $scope.amService.ToastSimple("Se guardado correctamente");
            }, function (error) {
                alert(error);
            });
        }else{
            $http.post($scope.serverUrl + "api/libros", $scope.libro).then(function(response) {
                $location.path("/editar/" + response.data._id);
                $scope.amService.ToastSimple("Se guardado correctamente");
            }, function (error) {
                alert(error);
                $scope.amService.ToastSimple("Se NO guardado correctamente");
            });
        }
    }

    $scope.eliminar = function(){
        $http.get($scope.serverUrl + "api/eliminar-libro/"+$scope.libro._id).then(function(response) {
            $scope.amService.ToastSimple("Se eliminado correctamente");
            $location.path("/");
        }, function (error) {
            $scope.amService.ToastSimple("Se NO eliminado correctamente");
            alert(error);
        });
    }

    $scope.escribir = function(id) {
        $location.path("/escritura/"+$scope.libro._id+"/" + id);
    };

    $scope.seleccionarCategoria = function(value){
        var result = Enumerable.From($scope.libro.categorias).Select("c => c.descripcion").Contains(value.descripcion);
        if(!result){
            $scope.libro.categorias.push(value);
        }
    }
    

    // Métodos privados

    //Esta método se puede usar tanto en la creación de capítulos de un libro o la creación de subcapítulos
    function mostrarVentanaEdicionCapitulo(ev, padre, capitulo, nuevo){
        $mdDialog.show({
            controller: gestionCapituloCtrl,
            templateUrl: '../../views/modals/gestionCapituloModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            locals: {
                capitulo: capitulo, nuevo: nuevo, categorias: $scope.obj.categorias
            }
        })
        .then(function(response) {
            if (response != null && response != undefined) {
                if(response === 'guardar'){
                    padre.capitulos.push(capitulo);
                }
                /*if(response === 'guardarYEscribir'){
                    $scope.libro.capitulos.push(capitulo);
                    $scope.guardar();
                }*/
                if(response === 'eliminar'){
                    padre.capitulos.splice(padre.capitulos.indexOf(capitulo), 1);
                }
            }
            }, function() {
        });
    }

    function obtenerLibro() {
        //Comprobamos si es un libro nuevo o estamos editando
        if($routeParams.id != null && $routeParams.id != undefined){
            $scope.conf.titulo = "Editar";
            $http.get($scope.serverUrl + "api/libros/" + $routeParams.id).then(function(response) {
                $scope.libro = response.data;
            }, function (error) {
                alert(error);
            });
        }else{//Es nuevo
            $scope.libro._creador = $scope.globals.currentUser.userInfo._id;
        }
    }

    function obtenerCategorias(){
        $http.get($scope.serverUrl + "api/categorias/").then(function(response) {
            $scope.obj.categorias = response.data;
        }, function (error) {
            alert(error);
        });
    }

    function inicializar() {
        $scope.libro = new Libro();
        $scope.conf = { titulo: "Nuevo" };
        $scope.obj = {};
        $scope.obj.categoriaModel = null;
        obtenerLibro();
        obtenerCategorias();
    }

    inicializar();

    // Controladores modals

    function gestionCapituloCtrl($scope, $mdDialog, capitulo, nuevo, categorias) {
        $scope.capitulo = capitulo;
        $scope.categorias = categorias;
        $scope.nuevo = nuevo;
        $scope.obj = {};
        $scope.obj.categoriaModel = null;

        $scope.nuevoSubcapitulo = function (ev) {
            var nuevoCapitulo = new Capitulo();
            nuevoCapitulo._autor = $scope.$parent.globals.currentUser.userInfo._id;
            mostrarVentanaEdicionCapitulo(ev, $scope.capitulo, nuevoCapitulo, nuevo);
        }

        $scope.editarSubcapitulo = function (ev, subcapitulo){
            mostrarVentanaEdicionCapitulo(ev, $scope.capitulo, subcapitulo, nuevo);
        }

        $scope.seleccionarCategoria = function(value){
            var result = Enumerable.From($scope.capitulo._categorias).Select("c => c.descripcion").Contains(value.descripcion);
            if(!result){
                $scope.capitulo._categorias.push(value);
            }
        }

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.guardar = function (respuesta) {
            $mdDialog.hide(respuesta);
        }
    }
});