function traerReporteStatus(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarStatus(respuesta);
        }
    });
}

function  pintarStatus(json_maquinas){

    let myTable="<table>";

        myTable+="<tr>";
        myTable+="<td>"+"Reservas completadas: " +json_maquinas.completed+"</td>";
        myTable+="<td>"+"Reservas canceladas: " +json_maquinas.cancelled+"</td>";
        myTable+="</tr>";
  
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function traerReportesFechas(){
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    console,log(startDate, endDate)

    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-dates/${startDate}/${endDate}",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarFechas(respuesta);
        }
    });
}

function pintarFechas(respuesta){

    let completadas = 0;
    let canceladas = 0;

    for(let i =0; i< respuesta.length; i++){
        if(respuesta[i].status == "cancelled"){
            canceladas++;
            console.log(`Reservas canceladas: ${canceladas}`)

        }else if(respuesta[i].status == "completed"){
            coompletadas++;
            console.log(`Reservas completas: ${completadas}`)
        }
    }
    
        let myTable="<table>";
    
            myTable+="<tr>";
            myTable+="<td>"+ "Reservas completadas:" + completadas+"</td>";
            myTable+="</tr>";
            myTable+="<tr>";
            myTable+="<td>"+ "Reservas canceladas:" + canceladas+"</td>";
            myTable+="</tr>";
      
        myTable+= "</table>";
        $("#resultado2").html(myTable);
    }

function traerReporteClientes(){
    
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarClientes(respuesta);
        }
    });
}
function pintarClientes(respuesta){

    let myTable = "<table class = 'max-w-2xl'>";
    for(let i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += `<td>ID: ${respuesta[i].Client.idClient}, </td>`;
        myTable += `<td> ${respuesta[i].Client.name}, </td>`;
        myTable += `<td> ${respuesta[i].Client.email}, </td>`;
        myTable += `<td>Contrasena ${respuesta[i].Client.password}, </td>`;
        myTable += `<td>Edad ${respuesta[i].Client.age}, </td>`;
        myTable += `<td>Reservas totales: ${respuesta[i].total}, </td>`;
        myTable += "<tr>";

    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}
