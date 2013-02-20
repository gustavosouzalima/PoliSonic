$("select#metodoCochilo").change(function(){
	var metodoCochilo = $(this).val();

	if(metodoCochilo === "Everyman") {
		$("select#tempoCochilo").html('<option value="20" selected>20</option><option value="30">30</option>')
	}else if(metodoCochilo === "Uberman") {
		$("select#tempoCochilo").html('<option value="20" selected>20</option>')
	}else if(metodoCochilo === "Dymaxion") {
		$("select#tempoCochilo").html('<option value="30" selected>30</option>')
	}
});

$("#calcular").click(function(){
	var h_inicial = parseInt($('#hora :selected').val()),
		m_inicial = parseInt($('#minutos :selected').val()),
		metodoCochilo = $('#metodoCochilo :selected').val(),
		m_tempoCochilo = parseInt($('#tempoCochilo :selected').val()),
		soneca = "";

	$("table").remove();
	$("small").remove();
	
	if(metodoCochilo === "Everyman") {
		calculaEveryman(h_inicial,m_inicial,m_tempoCochilo);
	}else if(metodoCochilo === "Uberman") {
		soneca = calculaUberman(h_inicial,m_inicial,m_tempoCochilo);
	}else if(metodoCochilo === "Dymaxion") {
		soneca = calculaDymaxion(h_inicial,m_inicial,m_tempoCochilo);
	}
});

$("#limpar").click(function(){
	$("table").remove();
	$("small").remove();
});

$("#a_calculadora").click(function(){
	$("table").remove();
	$("small").remove();	
	$("#compartilhe").hide(1000);
	$("#sobre").hide(1000);
	$("#horarios").show(1000);
});

$("#a_sobre").click(function(){
	$("table").remove();
	$("small").remove();	
	$("#compartilhe").hide(1000);
	$("#horarios").hide(1000);
	$("#sobre").show(1000);
});

$("#a_compartilhe").click(function(){
	$("table").remove();
	$("small").remove();	
	$("#horarios").hide(1000);
	$("#sobre").hide(1000);
	$("#compartilhe").show(1000);
});


function calculaEveryman(h_inicial,m_inicial,m_tempoCochilo){
	var h_intervalo_soneca = 5;

	for (var i=1;i<=4;i++)	{ 
		switch (i){
			case 1:
				m_tempoCochiloCore = 180;
				var	h_dormir = h_inicial,
					m_dormir = m_inicial,
					coreSleep = calculaCochilo(h_dormir,m_dormir,m_tempoCochiloCore),
					dormeCore = coreSleep["cochiloDorme"],
					acordaCore = coreSleep["cochiloAcorda"];
			  break;
			case 2:
				var	h_dormir = coreSleep["h_acordar"] + h_intervalo_soneca,
					m_dormir = coreSleep["m_acordar"],
					primeiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormePrimeiroCochilo = primeiroCochilo["cochiloDorme"],
					acordaPrimeiroCochilo = primeiroCochilo["cochiloAcorda"];
			  break;
			case 3:
				var	h_dormir = primeiroCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = primeiroCochilo["m_acordar"],
					segundoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeSegundoCochilo = segundoCochilo["cochiloDorme"],
					acordaSegundoCochilo = segundoCochilo["cochiloAcorda"];
			  break;
			case 4:
				var	h_dormir = segundoCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = segundoCochilo["m_acordar"],
					terceiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeTerceiroCochilo = terceiroCochilo["cochiloDorme"],
					acordaTerceiroCochilo = terceiroCochilo["cochiloAcorda"];
			  break;
		}
	}

	$("#horarios").append("<small>*O primeiro cochilo do Everyman é o CoreSleep</small>");
	$("#calculadora").append('\
		<table class="table table-condensed span5 offset1">\
			<thead>\
				<tr>\
					<th>Soneca</th>\
					<th>Dorme</th>\
					<th>Acorda</th>\
				</tr>\
			</thead>\
			<tbody>\
				<tr>\
					<td>CoreSleep</td>\
					<td>'+dormeCore+'</td>\
					<td>'+acordaCore+'</td>\
				</tr>\
				<tr>\
					<td>1ª Cochilo</td>\
					<td>'+dormePrimeiroCochilo+'</td>\
					<td>'+acordaPrimeiroCochilo+'</td>\
				</tr>\
				<tr>\
					<td>2ª Cochilo</td>\
					<td>'+dormeSegundoCochilo+'</td>\
					<td>'+acordaSegundoCochilo+'</td>\
				</tr>\
				<tr>\
					<td>3ª Cochilo</td>\
					<td>'+dormeTerceiroCochilo+'</td>\
					<td>'+acordaTerceiroCochilo+'</td>\
				</tr>\
			</tbody>\
		</table>');
}


function calculaUberman(h_inicial,m_inicial,m_tempoCochilo){
	var h_intervalo_soneca = 4;

	for (var i=1;i<=6;i++)	{ 
		switch (i){
			case 1:
				var	h_dormir = h_inicial,
					m_dormir = m_inicial,
					primeiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormePrimeiroCochilo = primeiroCochilo["cochiloDorme"],
					acordaPrimeiroCochilo = primeiroCochilo["cochiloAcorda"];
			  break;
			case 2:
				var	h_dormir = primeiroCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = primeiroCochilo["m_acordar"],
					segundoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeSegundoCochilo = segundoCochilo["cochiloDorme"],
					acordaSegundoCochilo = segundoCochilo["cochiloAcorda"];
			  break;
			case 3:
				var	h_dormir = segundoCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = segundoCochilo["m_acordar"],
					terceiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeTerceiroCochilo = terceiroCochilo["cochiloDorme"],
					acordaTerceiroCochilo = terceiroCochilo["cochiloAcorda"];
			  break;
			case 4:
				var	h_dormir = terceiroCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = terceiroCochilo["m_acordar"],
					quartoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeQuartoCochilo = quartoCochilo["cochiloDorme"],
					acordaQuartoCochilo = quartoCochilo["cochiloAcorda"];
			  break;
			case 5:
				var	h_dormir = quartoCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = quartoCochilo["m_acordar"],
					quintoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeQuintoCochilo = quintoCochilo["cochiloDorme"],
					acordaQuintoCochilo = quintoCochilo["cochiloAcorda"];
			  break;
			case 6:
				var	h_dormir = quintoCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = quintoCochilo["m_acordar"],
					sextoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeSextoCochilo = sextoCochilo["cochiloDorme"],
					acordaSextoCochilo = sextoCochilo["cochiloAcorda"];
			  break;
		}
	}

	$("#horarios").append("<small>*6 Cochilos de 20 minutos a cada 4 horas.</small>");
	$("#calculadora").append('\
		<table class="table table-condensed span5 offset1">\
			<thead>\
				<tr>\
					<th>Soneca</th>\
					<th>Dorme</th>\
					<th>Acorda</th>\
				</tr>\
			</thead>\
			<tbody>\
				<tr>\
					<td>1ª Cochilo</td>\
					<td>'+dormePrimeiroCochilo+'</td>\
					<td>'+acordaPrimeiroCochilo+'</td>\
				</tr>\
				<tr>\
					<td>2ª Cochilo</td>\
					<td>'+dormeSegundoCochilo+'</td>\
					<td>'+acordaSegundoCochilo+'</td>\
				</tr>\
				<tr>\
					<td>3ª Cochilo</td>\
					<td>'+dormeTerceiroCochilo+'</td>\
					<td>'+acordaTerceiroCochilo+'</td>\
				</tr>\
				<tr>\
					<td>4ª Cochilo</td>\
					<td>'+dormeQuartoCochilo+'</td>\
					<td>'+acordaQuartoCochilo+'</td>\
				</tr>\
				<tr>\
					<td>5ª Cochilo</td>\
					<td>'+dormeQuintoCochilo+'</td>\
					<td>'+acordaQuintoCochilo+'</td>\
				</tr>\
				<tr>\
					<td>6ª Cochilo</td>\
					<td>'+dormeSextoCochilo+'</td>\
					<td>'+acordaSextoCochilo+'</td>\
				</tr>\
			</tbody>\
		</table>');
}


function calculaDymaxion(h_inicial,m_inicial,m_tempoCochilo){
	// intervalo eh de 5 horas e meia, adiciono 30 minutos no m_inicial
	var h_intervalo_soneca = 5;

	for (var i=1;i<=4;i++)	{ 
		switch (i){
			case 1:
				var	h_dormir = h_inicial,
					m_dormir = m_inicial,
					primeiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormePrimeiroCochilo = primeiroCochilo["cochiloDorme"],
					acordaPrimeiroCochilo = primeiroCochilo["cochiloAcorda"];
			  break;
			case 2:
				var	h_dormir = primeiroCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = primeiroCochilo["m_acordar"] + 30,
					segundoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeSegundoCochilo = segundoCochilo["cochiloDorme"],
					acordaSegundoCochilo = segundoCochilo["cochiloAcorda"];
			  break;
			case 3:
				var	h_dormir = segundoCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = segundoCochilo["m_acordar"] + 30,
					terceiroCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeTerceiroCochilo = terceiroCochilo["cochiloDorme"],
					acordaTerceiroCochilo = terceiroCochilo["cochiloAcorda"];
			  break;
			case 4:
				var	h_dormir = terceiroCochilo["h_acordar"] + h_intervalo_soneca,
					m_dormir = terceiroCochilo["m_acordar"] + 30,
					quartoCochilo = calculaCochilo(h_dormir,m_dormir,m_tempoCochilo),
					dormeQuartoCochilo = quartoCochilo["cochiloDorme"],
					acordaQuartoCochilo = quartoCochilo["cochiloAcorda"];
			  break;
		}
	}

	$("#horarios").append("<small>*4 Cochilos de 20 minutos a cada 5 horas e 30 minutos.</small>");
	$("#calculadora").append('\
		<table class="table table-condensed span5 offset1">\
			<thead>\
				<tr>\
					<th>Soneca</th>\
					<th>Dorme</th>\
					<th>Acorda</th>\
				</tr>\
			</thead>\
			<tbody>\
				<tr>\
					<td>1ª Cochilo</td>\
					<td>'+dormePrimeiroCochilo+'</td>\
					<td>'+acordaPrimeiroCochilo+'</td>\
				</tr>\
				<tr>\
					<td>2ª Cochilo</td>\
					<td>'+dormeSegundoCochilo+'</td>\
					<td>'+acordaSegundoCochilo+'</td>\
				</tr>\
				<tr>\
					<td>3ª Cochilo</td>\
					<td>'+dormeTerceiroCochilo+'</td>\
					<td>'+acordaTerceiroCochilo+'</td>\
				</tr>\
				<tr>\
					<td>4ª Cochilo</td>\
					<td>'+dormeQuartoCochilo+'</td>\
					<td>'+acordaQuartoCochilo+'</td>\
				</tr>\
			</tbody>\
		</table>');
}


function calculaCochilo(h_dormir,m_dormir,m_tempoCochilo){

	var	m_acordar = 0,
		h_acordar = 0,
		cochiloDorme,
		cochiloAcorda;

	if (m_tempoCochilo === 180){
		h_acordar = h_dormir + 3;
	}else if(m_tempoCochilo === 20){
		if(m_dormir === 40){
			h_acordar = h_dormir + 1;
		}else if(m_dormir === 45){
			m_acordar = 5;
			h_acordar = h_dormir + 1;
		}else if(m_dormir === 50){
			m_acordar = 10;
			h_acordar = h_dormir + 1;
		}else if(m_dormir === 55){
			m_acordar = 15;
			h_acordar = h_dormir + 1;
		}else {
			m_acordar = m_dormir+m_tempoCochilo;
			h_acordar = h_dormir;
		}
	}else if (m_tempoCochilo === 30){
		if(m_dormir === 60){
			h_dormir += 1;
			m_dormir = 0;
			m_acordar = 30;
			h_acordar = h_dormir;
		}else if(m_dormir === 30){
			m_acordar = 0;
			h_acordar = h_dormir + 1;
		}else if(m_dormir === 45){
			m_acordar = 15;
			h_acordar = h_dormir + 1;
		}else {
			m_acordar = m_dormir+m_tempoCochilo;
			h_acordar = h_dormir;
		}
	}

	cochiloDorme = formataHora(h_dormir) + ":" + formataMinutos(m_dormir);
	cochiloAcorda = formataHora(h_acordar) + ":" + formataMinutos(m_acordar);

	return {
		"h_acordar":h_acordar,
		"m_acordar":m_acordar,
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
