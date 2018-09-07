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
app.controller('ViagemCtrl', function ($scope, $location) {

});

app.controller('DespesaCtrl', function ($scope, $location) {

});

app.controller('RelatorioCtrl', function ($scope, $location) {

});

