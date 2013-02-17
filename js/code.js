$("#calcular").click(function(){
	var hora = parseInt($('#hora :selected').text()),
		minutos = parseInt($('#minutos :selected').text()),
		tempoCochilo = parseInt($('#tempoCochilo :selected').text()),
		soneca = calculaSoneca(hora,minutos,tempoCochilo);

	$("table").remove();
	$(".container").append('<table class="table table-striped span7 offset2"><thead><tr><th>Soneca</th><th>Dorme</th><th>Acorda</th></tr></thead><tbody><tr><td>CoreSleep</td><td>'+soneca["coreDorme"]+'</td><td>'+soneca["coreAcorda"]+'</td></tr><tr><td>1ª Cochilo</td><td>'+soneca["cochilo1Dorme"]+'</td><td>'+soneca["cochilo1Acorda"]+'</td></tr><td>2ª Cochilo</td><td>'+soneca["cochilo2Dorme"]+'</td><td>'+soneca["cochilo2Acorda"]+'</td></tr><td>3ª Cochilo</td><td>'+soneca["cochilo3Dorme"]+'</td><td>'+soneca["cochilo3Acorda"]+'</td></tr></tbody></table>');
});

function calculaSoneca(hora,minutos,tempoCochilo){

	var	tempoCore = hora + 3,
		coreDorme = formataHora(hora) + ":" + formataHora(minutos);
	if(tempoCore >=24){
		tempoCore = tempoCore - 24;
	}
	var	coreAcorda = formataHora(tempoCore) + ":" + formataHora(minutos);

	for (var i=1;i<=3;i++)	{ 
		switch (i){
			case 1:
				var	cochilo1Hora = (tempoCore + 5),
					cochilo1Minutos = 0;
				
				if(cochilo1Hora >=24){
					cochilo1Hora = cochilo1Hora - 24;
				}
				var	cochilo1Dorme = formataHora(cochilo1Hora) + ":" + formataHora(minutos);

				if(tempoCochilo === 20){
					if(minutos === 40){
						cochilo1Minutos = 0;
						cochilo1Hora += 1;
					}else if(minutos === 45){
						cochilo1Minutos = 5;
						cochilo1Hora += 1;
					}else if(minutos === 50){
						cochilo1Minutos = 10;
						cochilo1Hora += 1;
					}else if(minutos === 55){
						cochilo1Minutos = 15;
						cochilo1Hora += 1;
					}else {
						cochilo1Minutos = minutos+tempoCochilo;
					}
				}else if (tempoCochilo === 30){
					if(minutos === 30){
						cochilo1Minutos = 0;
						cochilo1Hora = 1;
					}else if(minutos === 45){
						cochilo1Minutos = 15;
						cochilo1Hora += 1;
					}else {
						cochilo1Minutos = minutos+tempoCochilo;
					}
				}

				var	cochilo1Acorda = formataHora(cochilo1Hora) + ":" + formataHora(cochilo1Minutos);

			  break;
			case 2:
				var	cochilo2Hora = cochilo1Hora + 5,
					cochilo2Minutos = 0;

				if(cochilo2Hora >=24){
					cochilo2Hora = cochilo2Hora - 24;
				}
				var	cochilo2Dorme = formataHora(cochilo2Hora) + ":" + formataHora(cochilo1Minutos);

				if(tempoCochilo === 20){
					if(cochilo1Minutos === 40){
						cochilo2Minutos = 0;
						cochilo2Hora += 1;
					}else if(cochilo1Minutos === 45){
						cochilo2Minutos = 5;
						cochilo2Hora += 1;
					}else if(cochilo1Minutos === 50){
						cochilo2Minutos = 10;
						cochilo2Hora += 1;
					}else if(cochilo1Minutos === 55){
						cochilo2Minutos = 15;
						cochilo2Hora += 1;
					}else {
						cochilo2Minutos = cochilo1Minutos+tempoCochilo;
					}
				}else if (tempoCochilo === 30){
					if(cochilo1Minutos === 30){
						cochilo2Minutos = 0;
						cochilo2Hora += 1;
					}else if(cochilo1Minutos === 45){
						cochilo2Minutos = 15;
						cochilo2Hora += 1;
					}else {
						cochilo2Minutos = cochilo1Minutos+tempoCochilo;
					}
				}
				var	cochilo2Acorda = formataHora(cochilo2Hora) + ":" + formataHora(cochilo2Minutos);
			  break;
			case 3:
				var	cochilo3Hora = cochilo2Hora + 5,
					cochilo3Minutos = 0;

				if(cochilo3Hora >=24){
					cochilo3Hora = cochilo3Hora - 24;
				}
				var	cochilo3Dorme = formataHora(cochilo3Hora) + ":" + formataHora(cochilo2Minutos);

				if(tempoCochilo === 20){
					if(cochilo2Minutos === 40){
						cochilo3Minutos = 0;
						cochilo3Hora += 1;
					}else if(cochilo2Minutos === 45){
						cochilo3Minutos = 5;
						cochilo3Hora += 1;
					}else if(cochilo2Minutos === 50){
						cochilo3Minutos = 10;
						cochilo3Hora += 1;
					}else if(cochilo2Minutos === 55){
						cochilo3Minutos = 15;
						cochilo3Hora += 1;
					}else {
						cochilo3Minutos = cochilo2Minutos+tempoCochilo;
					}
				}else if (tempoCochilo === 30){
					if(cochilo2Minutos === 30){
						cochilo3Minutos = 0;
						cochilo3Hora += 1;
					}else if(cochilo2Minutos === 45){
						cochilo3Minutos = 15;
						cochilo3Hora += 1;
					}else {
						cochilo3Minutos = cochilo2Minutos+tempoCochilo;
					}
				}
				var	cochilo3Acorda = formataHora(cochilo3Hora) + ":" + formataHora(cochilo3Minutos);
			  break;
		}
	}

	return {
		"coreDorme":coreDorme,
		"coreAcorda":coreAcorda,
		"cochilo1Dorme":cochilo1Dorme,
		"cochilo1Acorda":cochilo1Acorda,
		"cochilo2Dorme":cochilo2Dorme,
		"cochilo2Acorda":cochilo2Acorda,
		"cochilo3Dorme":cochilo3Dorme,
		"cochilo3Acorda":cochilo3Acorda,
	}
}

function formataHora(tempo){
	if(tempo.toString().length < 2 ){
		tempo = "0" + tempo
	}
	return tempo
}