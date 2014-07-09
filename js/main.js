//MODULO DE ANGULAR
(function(w, ng){

	var app = ng.module("store", []);
	//CONTROLADOR DE DATOS (mineralGems.json)
	app.controller("StoreController", function($scope, $http){
		$http	.get('data/mineralGems.json')
				.success(function(json, status, headers, config) {
					//creo una propiedad que se llamara 'products', y se la asigno al contexto del controlador 'StoreController' 
					$scope.products = json;
				})
				.error(function(data, status, headers, config) {
					console.log(data+" :: "+status+" :: "+headers+" :: "+config);
				});
	});

	//en angular las expresiones {{tab}} se reevaluan cuando las propiedades cambian [tab = 1]
	//CONTROLADOR DE INITERACCION CON TABS
	var panel = app.controller('PanaleController', function(){
		this.tab = 1; //inicializamos la propiedad
		this.selectedTab = function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkTab){
			return (checkTab === this.tab) ? true : false;
		};
	});

	//CONTROLADORD DE IMAGEN SELECCIONADA
	app.controller("GalleryController", function(){
		this.current = 0; //valor por defecto de imagen product.images[0]
		this.setCurrent = function(select){
			//HAY QUE PASAR : select = product.image.full[select]
			this.current =  (!isEmpty(select)) ? select : 0;
		};
	});

})(window, window.angular);

/*comprobar si es nula una variable*/
var isEmpty = function(str) {
   return (!str || 0 === str.length);
};