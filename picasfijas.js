function llenarAleatorios(a){
    var v = Math.floor(Math.random() * 10);
    if(!a.some(function(e){return e == v})){
        a.push(v);
    }
    return(a);
};

function generar_numero(cifras) {
	var a = [];
	
	while (a.length < cifras)
		a = llenarAleatorios(a);
	return(a);
}

function valida_entrada() {
	var arreglo = arr_entrada.slice();
	
	// Si hay más de 4 dígitos retorna falso
	if (arreglo.length != 4)
		return false;

	// Ordena el arreglo y compara las 2 primeras posiciones. Si son iguales indica que 
	// 	hay números repetidos por lo que retorna falso
	arreglo.sort();
	for (var i = 0; i < 3; i++) {
		if(arreglo[0] === arreglo[1]) {
			return false;
		}
		arreglo.shift();
	}
	return true;
}

function calcula_pyf() {
	var pyf = [];
	pyf[0] = 0;
	pyf[1] = 0;
	
	var posicion;
	
	for(i=0;i<4;i++) {
		posicion = arr_rpta.findIndex(function(e){return e === arr_entrada[i]});
		if (posicion === i)
			pyf[1]++;
		else
			if (posicion >= 0)
				pyf[0]++;
	}
	return pyf;
}

// Genera número aleatorio de 4 dígitos y lo asigna a array respuesta
var arr_rpta = generar_numero(4);
console.log(arr_rpta);

var arr_entrada = [];

// Posiciona el cursor en el input
$("input").focus();

$("input").keyup(function(event) {
	if (event.keyCode === 13) {

		// Incializa el array de entrada
		arr_entrada = [];

		// Asigna cada dígito a una posición del arreglo de entrada
		var n = $("input").val();
		var num = n;
		while(n>0){arr_entrada.unshift(n%10);n=n/10|0;}
		if (num<1000) arr_entrada.unshift(0);
		
		// Si no es válida la entrada muestra error	
		if (!valida_entrada() || num.length != 4) {
			$("span").addClass("error");
			$("input").addClass("errorinput");
		}
		else {
			// Inicializa arreglo de Picas y Fijas obtenidas
			var picasyfijas = [];

			$("span").removeClass("error");
			$("input").removeClass("errorinput");

			picasyfijas = calcula_pyf();
			nuevo_registro = "<tr><td>" + $("input").val() + "</td>" +
							"<td>" + picasyfijas[0] + "</td>" +
							"<td>" + picasyfijas[1] + "</td></tr>";	

			$("tbody").prepend(nuevo_registro);
			$("input").val("");
			if (picasyfijas[1] === 4) {
				$(".fin").css("display","inline")
				$("input").prop("disabled",true);
				$("#circle").addClass("scale");
				$(".principal").hide();
			}
		}
	}
	else {
		$("span").removeClass("error");
		$("input").removeClass("errorinput");
	}
});


$("#replay").click(function () {
	location.reload();
});
