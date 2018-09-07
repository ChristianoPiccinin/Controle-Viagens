var viagemModulo =  angular.module('viagemModulo',[]);

viagemModulo.controller("viagemController",function ($scope) {
    
    $scope.viagens = [
        {data:'teste', nota:'teste',origem:'teste',destino:'teste',valor:'teste'}
    ];
    


    $scope.salvar = function() {
        $scope.viagens.push($scope.viagem);
		console.log($scope.viagem);
       
    }

});