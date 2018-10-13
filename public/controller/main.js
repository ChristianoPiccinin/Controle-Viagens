/**
* Inicializamos o angular.module com o mesmo nome que definimos na diretiva ng-app
* E incluímos a dependência do ngRoute 
*/
var app = angular.module('myApp', [
    'ngRoute'
    ]);
    
/**
 * Como possuímos a variavel app definida acima com a inicialização do Angular
 * através do app.config conseguimos criar as configurações
 * definimos que essa configuração depende do $routeProvider e usamos na function($routeProvider)
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    
        // aqui dizemos quando estivernos na url / vamos carregar o conteúdo da pagina inicila a home
        // no segundo parametro definimos um objeto contendo o templateUrl da nossa pagina home e o controller que irá
        // preparar o conteudo e processar outros eventos da página que veremos posteriormente
        .when("/", {templateUrl: "templates/viagem.html", controller: "ViagemCtrl"})
        // configuração das rotas bem parecidas para as outras paginas
        .when("/despesa", {templateUrl: "templates/despesa.html", controller: "DespesaCtrl"})
        .when("/relatorio", {templateUrl: "templates/relatorio.html", controller: "RelatorioCtrl"})
        .when('/404', {templateUrl: "templates/404.html"})
        // por último dizemos se nenhuma url digitada for encontrada mostramos a página 404 que não existe no nosso servidor
        .otherwise("/404");
}]);

/*
 * Controllers
 */
app.controller('ViagemCtrl', function ($scope, $location, $http) {
    
    $scope.loader = {
        loading: false
    };

    $scope.criarViagem = function () {
        
        $scope.loader.loading = true;
        $http.post('/api/insertviagem', {
            'data':    $scope.viagem.data,
            'nota':    $scope.viagem.nota,
            'origem':  $scope.viagem.origem,
            'destino': $scope.viagem.destino,
            'valor' :  $scope.viagem.valor
        })
        .success(function (data, status, headers, config) {
            console.log("Registro incluido em VIAGENS com sucesso!");
            
        })
        .error(function (data, status, headers, config) {
                console.log("ERRO ao incluir registro em VIAGENS");
                $scope.loader.loading = false;
        });
    };
});

app.controller('DespesaCtrl', function ($scope, $location , $http) {
    $scope.loader = {
        loading: false
    };

    $scope.criarDespesa = function () {
        
        console.log($scope.despesa);


        $scope.loader.loading = true;
        $http.post('/api/insertdespesa', {
            'data':      $scope.despesa.data,
            'descricao': $scope.despesa.descricao,
            'valor' :    $scope.despesa.valor
        })
        .success(function (data, status, headers, config) {
            console.log("Registro incluido em DESPESAS com sucesso!");
            
        })
        .error(function (data, status, headers, config) {
                console.log("ERRO ao incluir registro em DESPESAS");
                $scope.loader.loading = false;
        });
    };
});

app.controller('RelatorioCtrl', function ($scope, $location, $http) {

    $scope.loader = {
        loading: false
    };

    $scope.listarRegistros = function () {

        console.log( $scope.relatorio.datainicio);
        console.log($scope.relatorio.datafim);
        
        
        /*
        $scope.loader.loading = true;
        $http.post('/api/report', {
            'datainicio': $scope.relatorio.datainicio,
            'datafinal':  $scope.relatorio.datafim
            
        })
        .success(function (data, status, headers, config) {
            console.log("Ok!");
            
        })
        .error(function (data, status, headers, config) {
                console.log("Nok!");
                $scope.loader.loading = false;
        });
        */
    };
  

});
