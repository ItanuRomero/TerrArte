var path_webservice = "http://localhost/chacaravago/server/webservice.php";

function aplicarmascara(){
    $("#txttelefone").mask("(99) 99999-9999");
    $("#txtcpf").mask("999.999.999-99");
}

function removermascara(){
    $("#txttelefone").unmask();
    $("#txtcpf").unmask();
}

function removervalidacao(){
    $("input").removeClass("is-valid");
    $("input").removeClass("is-invalid");
}

$(document).ready(function(){
    aplicarmascara();

    $("#btn-cadastrar").click(function(){
       $("#mensagem").slideUp("fast");
       removermascara();
       removervalidacao();
        // $("#msg-erro").html("Erro no campo CPF");
        // $("#mensagem").slideDown("fast");
        let nome, email, cpf, senha, 
        repetirsenha, telefone, datanascimento;

        nome = $("#txtnome").val();
        email = $("#txtemail").val();
        cpf = $("#txtcpf").val();
        senha = $("#txtsenha").val();
        repetirsenha = $("#txtrepetirsenha").val();
        telefone = $("#txttelefone").val();
        datanascimento = $("#txtnascimento").val();

        if(verificarnome(nome))
            $("#txtnome").addClass("is-valid");
        else
            $("#txtnome").addClass("is-invalid");

        if(verificaremail(email))
            $("#txtemail").addClass("is-valid");
        else
            $("#txtemail").addClass("is-invalid");
        
        if(verificarcpf(cpf))
            $("#txtcpf").addClass("is-valid");
        else
            $("#txtcpf").addClass("is-invalid");

        if(verificarsenha(senha, repetirsenha, 6))
            $("#txtsenha, #txtrepetirsenha").addClass("is-valid");
        else
            $("#txtsenha, #txtrepetirsenha").addClass("is-invalid");

        if(verificartxt(telefone, 11))
            $("#txttelefone").addClass("is-valid");
        else
            $("#txttelefone").addClass("is-invalid");
        
        if(verificardata(datanascimento))
            $("#txtnascimento").addClass("is-valid");
        else
            $("#txtnascimento").addClass("is-invalid");
        
        if($("#checktermos").is(":checked"))
            $("#checktermos").addClass("is-valid");
        else
            $("#checktermos").addClass("is-invalid");
        
        
        var qtderros = $("input.is-invalid").length;
        if(qtderros == 0){
            alert(path_webservice);
            $.ajax({
                url: path_webservice,
                method:"get",
                data:{
                    "tipo":"cadastrar_usuario",
                    "nome": nome,
                    "cpf": cpf,
                    "email": email,
                    "nascimento": datanascimento,
                    "celular": telefone,
                    "senha": senha,
                    "repetirsenha": repetirsenha
                },
                success: function(retorno){
                    alert(retorno);
                },
                timeout: 10000,
                error: function(){
                    $("#msg-erro").html("Erro ao comunicar o servidor, tente novamente!");
                    $("#mensagem").slideDown("fast");
                }
            })


        }
        else{
            $("#msg-erro").html("Verificar os campo destacados");
            $("#mensagem").slideDown("fast");
        }

        aplicarmascara();
    });


    $("#fechar-alerta").click(function(){
        $("#mensagem").slideUp("fast");
    });
});