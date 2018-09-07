var despesaModulo =  angular.module('despesaModulo',[]);


despesaModulo.controller("despesaController",function ($scope) {
    
    $scope.viagens = [
        {data:'teste', descricao:'teste',valor:'teste'}
    ];
    

    $scope.salvar = function() {
        $scope.despesas.push($scope.despesa);
		       
    }

});