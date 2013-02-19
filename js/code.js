$("#calcular").click(function(){
	var m_hora = parseInt($('#hora :selected').text()),
		m_core = parseInt($('#minutos :selected').text()),
		tempoCochilo = parseInt($('#tempoCochilo :selected').text()),
		soneca = calcula(m_hora,m_core,tempoCochilo);

	$("table").remove();
	$("#calculadora").append('<table class="table table-striped span6 offset1"><thead><tr><th>Soneca</th><th>Dorme</th><th>Acorda</th></tr></thead><tbody><tr><td>CoreSleep</td><td>'+soneca["dormeCore"]+'</td><td>'+soneca["acordaCore"]+'</td></tr><tr><td>1ª Cochilo</td><td>'+soneca["dormePrimeiroCochilo"]+'</td><td>'+soneca["acordaPrimeiroCochilo"]+'</td></tr><td>2ª Cochilo</td><td>'+soneca["dormeSegundoCochilo"]+'</td><td>'+soneca["acordaSegundoCochilo"]+'</td></tr><td>3ª Cochilo</td><td>'+soneca["dormeTerceiroCochilo"]+'</td><td>'+soneca["acordaTerceiroCochilo"]+'</td></tr></tbody></table>');
});

function calcula(m_hora,m_core,tempoCochilo){

	var	tempoCore = m_hora + 3;
	if(tempoCore >=24){
		tempoCore = tempoCore - 24;
	}
	var dormeCore = formataHora(m_hora) + ":" + formataMinutos(m_core),
		acordaCore = formataHora(tempoCore) + ":" + formataMinutos(m_core);

	for (var i=1;i<=3;i++)	{ 
		switch (i){
			case 1:
				var	h_anterior = tempoCore,
					h_atual = h_anterior + 5,
					m_anterior = m_core,
					primeiroCochilo = calculaCochilo(h_atual,h_anterior,m_anterior,tempoCochilo),
					dormePrimeiroCochilo = primeiroCochilo["cochiloDorme"],
					acordaPrimeiroCochilo = primeiroCochilo["cochiloAcorda"];
			  break;
			case 2:
				var	h_anterior = primeiroCochilo["h_atual"],
					h_atual = h_anterior + 5,
					m_anterior = primeiroCochilo["m_atual"],
					segundoCochilo = calculaCochilo(h_atual,h_anterior,m_anterior,tempoCochilo),
					dormeSegundoCochilo = segundoCochilo["cochiloDorme"],
					acordaSegundoCochilo = segundoCochilo["cochiloAcorda"];
			  break;
			case 3:
				var	h_anterior = segundoCochilo["h_atual"],
					h_atual = h_anterior + 5,
					m_anterior = segundoCochilo["m_atual"],
					terceiroCochilo = calculaCochilo(h_atual,h_anterior,m_anterior,tempoCochilo),
					dormeTerceiroCochilo = terceiroCochilo["cochiloDorme"],
					acordaTerceiroCochilo = terceiroCochilo["cochiloAcorda"];
			  break;
		}
	}

	return {
		"dormeCore":dormeCore,
		"acordaCore":acordaCore,
		"dormePrimeiroCochilo":dormePrimeiroCochilo,
		"acordaPrimeiroCochilo":acordaPrimeiroCochilo,
		"dormeSegundoCochilo":dormeSegundoCochilo,
		"acordaSegundoCochilo":acordaSegundoCochilo,
		"dormeTerceiroCochilo":dormeTerceiroCochilo,
		"acordaTerceiroCochilo":acordaTerceiroCochilo,
	}
}

function calculaCochilo(h_atual,h_anterior,m_anterior,tempoCochilo){

	var	m_atual = 0,
		cochiloDorme = formataHora(h_atual) + ":" + formataMinutos(m_anterior);

	if(tempoCochilo === 20){
		if(m_anterior === 40){
			h_atual += 1;
		}else if(m_anterior === 45){
			m_atual = 5;
			h_atual += 1;
		}else if(m_anterior === 50){
			m_atual = 10;
			h_atual += 1;
		}else if(m_anterior === 55){
			m_atual = 15;
			h_atual += 1;
		}else {
			m_atual = m_anterior+tempoCochilo;
		}
	}else if (tempoCochilo === 30){
		if(m_anterior === 30){
			m_atual = 0;
			h_atual += 1;
		}else if(m_anterior === 45){
			m_atual = 15;
			h_atual += 1;
		}else {
			m_atual = m_anterior+tempoCochilo;
		}
	}
	var	cochiloAcorda = formataHora(h_atual) + ":" + formataMinutos(m_atual);

	return {
		"h_atual":h_atual,
		"m_atual":m_atual,
		"cochiloAcorda":cochiloAcorda,
		"cochiloDorme":cochiloDorme
	} 
}

function formataHora(tempo){
	if(tempo >=24){
		tempo = tempo - 24;
	}
	if(tempo.toString().length < 2 ){
		tempo = "0" + tempo
	}
	return tempo
}

function formataMinutos(tempo){
	if(tempo.toString().length < 2 ){
		tempo = "0" + tempo
	}
	return tempo
}
