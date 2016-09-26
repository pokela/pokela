app.controller('lecturaCtrl', function($scope, $http, $routeParams, $timeout, $mdSidenav) {
    function Pagina(){
        this.pagina = null;
        this.cuerpo = null;
        this.pie = null;
    }
    
    /* Zonas colapsables laterales */
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    function obtenerLibro() {
        $http.get($scope.serverUrl + "api/libros/" + $routeParams.id).then(function(response) {
            $scope.libro = response.data;
            //Comprobamos si recibimos el idCapitulo para situarnos en el, si no nos situamos en el último
            if($routeParams.idCapitulo != null && $routeParams.idCapitulo != undefined){
                for (var i = 0; i < $scope.libro.capitulos.length; i++) {
                    if ($scope.libro.capitulos[i]._id == $routeParams.idCapitulo) {
                        $scope.capitulo = $scope.libro.capitulos[i];
                        break;
                    }
                }
            }else{
                $scope.capitulo = $scope.libro.capitulos[0];
            }
            paginacion();
        }, function (error) {
            alert(error);
        });
    }

    function ajustarTamanyoContenedorPaginas() {
        var ancho = 78;
        if (!$("#barra-derecha").is(":visible")) {
            ancho += 15;
        }

        if (!$("#barra-izquierda").is(":visible")) {
            ancho += 5;
        }

        $(".container-pages").animate({width: ancho+"%"}, 1);
    }


    function paginacion(){

        $(document).ready(function () {
            var options = {
                alturaMaxima: 1020,
                alturaLinea: 20 //Tamaño de línea con el tamaño de fuente actual
            }

            var contenedorPaginas = $('.container-pages')[0];
            $(contenedorPaginas).html("");
            var numPaginas= 1;
            var objPagina = nuevaPagina($(contenedorPaginas), numPaginas);
            
            //Convertimos el contenido en elementos $ para poder navegar por ellos
            var wrapContenido = $($scope.capitulo.contenido);

            wrapContenido.each(function (item) {
                //Añadimos el nuevo elemento al DOM para poder obtener su altura.
                $(objPagina.cuerpo[0]).append(this);
                var alturaCuerpo = $(objPagina.cuerpo[0]).height();

                //Si el nuevo elemento hace superar al altura del contenido se hace el salto de página
                if (alturaCuerpo > options.alturaMaxima) {
                    //Eliminamos el nuevo elemento añadido previamente
                    $(this).remove();

                    //Añadimos una nueva página
                    numPaginas++;
                    objPagina = nuevaPagina($(contenedorPaginas), numPaginas);
                    $(objPagina.cuerpo[0]).append($(this));
                }
            });
        })
    }

    function nuevaPagina(contenedorPaginas, numero){
        var respuesta = new Pagina();
        respuesta.pagina = $('<div class="page"><div class="page-content"></div><div class="page-footer">'+numero+'</div></div>');
        respuesta.cuerpo = $(respuesta.pagina).find('.page-content');
        respuesta.pie = $(respuesta.pagina).find('.page-footer');
        $(contenedorPaginas).append(respuesta.pagina[0]);
        return respuesta;
    }

    function configuracionPaginacion() {
        $(document).ready(function(){
            //Añadimos los controladores de eventos para las zonas colapsables
            $("#colapsar-barra-izquierda").click(function(){
                $("#barra-izquierda").animate({width: 'toggle'}, 1, function () {
                    if ($("#barra-izquierda").is(":visible")) {
                        $("#flecha-barra-izquierda").removeClass("fa-caret-right");
                        $("#flecha-barra-izquierda").addClass("fa-caret-left");
                        $("#barra-izquierda").css({'width': '5%'});
                    }else{
                        $("#barra-izquierda").css({'width': '0%'});
                        $("#flecha-barra-izquierda").removeClass("fa-caret-left");
                        $("#flecha-barra-izquierda").addClass("fa-caret-right");
                    }
                    ajustarTamanyoContenedorPaginas();
                    paginacion();
                });
            });

            $("#colapsar-barra-derecha").click(function(){
                $("#barra-derecha").animate({width: 'toggle'}, 1, function () {
                    if ($("#barra-derecha").is(":visible")) {
                        $("#flecha-barra-derecha").removeClass("fa-caret-left");
                        $("#flecha-barra-derecha").addClass("fa-caret-right");
                        $("#barra-derecha").css({'width': '15%'});
                    }else{
                        $("#barra-derecha").css({'width': '0%'});
                        $("#flecha-barra-derecha").removeClass("fa-caret-right");
                        $("#flecha-barra-derecha").addClass("fa-caret-left");
                    }
                    ajustarTamanyoContenedorPaginas();
                    paginacion();
                });
            });

            $(window).resize(function () {
                paginacion();
            })
        });
    }

    function inicializar() {
        $scope.fabSpeed = {
            selectedMode: 'md-scale',
            selectedDirection: 'left'
        };
        obtenerLibro();
        configuracionPaginacion();

        
    }

    inicializar();
});