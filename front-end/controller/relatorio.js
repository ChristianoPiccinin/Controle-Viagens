var relatorioModulo =  angular.module('relatorioModulo',[]);


relatorioModulo.controller("relatorioController",function ($scope, $http) {
    $http.get('controller/relatoriojson.json').then(function (response) {
        $scope.registros = response.data.relatorio;
    })

});