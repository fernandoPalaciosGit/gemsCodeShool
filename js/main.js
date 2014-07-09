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

	//CONTROLLER FOR  REVIEW FORM
	// app.controller("ReviewController", function(){
	// 	this.review = {};
	// 	this.addReview = function(product){
	// 		this.review.createdOn = new Date();
	// 		product.reviews.push(this.review);
	// 		//primero se añade como nueva propiedad del modelo product y despues se  
	// 		//aqui se formateara en la vista de automaticamente
	// 		this.review = {};//reseteare para que en la siguente vista se muestren los campos vacios
	// 	};
	// });

	app.directive("productReviews", function(){
		return { //configuraciones de diretivas html
			//restrict: 'A', //tipo de directiva, A: atributo
			//templateUrl: 'directive/include-product-reviews.tpl.html'
			restrict: 'E', //tipo de directiva, E: elemento html
			templateUrl: 'directive/product-reviews.tpl.html'
		};
	});

	app.directive("productNewReviews", function(){
		return {
			restrict: "E",
			templateUrl: "directive/product-new-reviews.tpl.html"
		};
	});

	app.directive("productDescription", function(){
		return {
			restrict: "A",
			templateUrl: "directive/product-description.tpl.html"
		};
	});

	app.directive("productSpecs", function(){
		return {
			restrict: "A",
			templateUrl: "directive/product-specs.tpl.html"
		};
	});

	//esta directiva tiene en particular, que lleva asociado un controlador para las propiedades que se quieren imprimir dentro de la directiva html, por lo que el modulo, podremos embeberlo en esta declaracion de la directiva
	app.directive("formReviews", function(){
		return{
			restrict: "E",
			templateUrl: "directive/form-reviews.tpl.html",
			controller: function(){
				this.review = {};
				this.addReview = function(product){
					this.review.createdOn = new Date();
					product.reviews.push(this.review);
					//primero se añade como nueva propiedad del modelo product y despues se  
					//aqui se formateara en la vista de automaticamente
					this.review = {};//reseteare para que en la siguente vista se muestren los campos vacios
				};
			},
			controllerAs: "reviewCtrl"
		};
	});

})(window, window.angular);

/*comprobar si es nula una variable*/
var isEmpty = function(str) {
   return (!str || 0 === str.length);
};