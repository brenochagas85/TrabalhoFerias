$(function () {
    $id = -1;
    $(".table").on("click", ".botaoEditar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/cliente/obterpeloid/' + $id,
            method: 'get',
            success: function (data) {
                $id = data.Id;
                $("campo-id-cidade").val(data.IdCidade);
                $("#campo-nome").val(data.Nome);
                $("#campo-cpf").val(data.Cpf);
                $("#campo-data-nascimento").val(data.DataNascimento);
                $("#campo-numero").val(data.Numero);
                $("#campo-complemento").val(data.Complemento);
                $("#campo-logradouro").val(data.Lograduro);
                $("#campo-cep").val(data.Cep);
                $("#modalCadastroCategoria").modal("show");
            }
        })
    });

    function obterTodos() {
        $busca = $("#campo-pesquisa").val();
        $("#lista-cliente").empty();
        $.ajax({
            url: '/cliente/obtertodos',
            method: 'get',
            data: {
                busca: $busca
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var dado = data[i];


                    var linha = document.createElement("tr");
                    var colunaIdCidade = document.createElement("td");
                    colunaIdCidade.innerHTML = dado.IdCidade;

                    var colunaNome = document.createElement("td");
                    colunaNome.innerHTML = dado.Nome;

                    var colunaCpf = document.createElement("td");
                    colunaNome.innerHTML = dado.colunaCpf;

                    var colunaDataNascimento = document.createElement("td");
                    colunaNome.innerHTML = dado.colunaDataNascimento;

                    var colunaNumero = document.createElement("td");
                    colunaNome.innerHTML = dado.colunaNumero;

                    var colunaComplemento = document.createElement("td");
                    colunaNome.innerHTML = dado.colunaComplemento;

                    var colunaLogradouro = document.createElement("td");
                    colunaNome.innerHTML = dado.colunaLogradouro;

                    var colunaCep = document.createElement("td");
                    colunaNome.innerHTML = dado.colunaCep;


                    var colunaAcao = document.createElement("td");
                    var botaoEditar = document.createElement("button");
                    botaoEditar.classList.add("btn", "btn-primary", "mr-3"
                        , "botao-editar");
                    botaoEditar.innerHTML =
                        "<i class=\"fas fa-pen\"></i> Editar";
                    botaoEditar.setAttribute("data-id", dado.Id);

                    var botaoApagar = document.createElement("button");
                    botaoApagar.innerHTML =
                        "<i class=\"fas fa-trash\"></i> Apagar";
                    botaoApagar.classList.add("btn", "btn-danger",
                        "botao-apagar");
                    botaoApagar.setAttribute("data-id", dado.Id);

                    colunaAcao.appendChild(botaoEditar);
                    colunaAcao.appendChild(botaoApagar);

                    linha.appendChild(IdCidade);
                    linha.appendChild(colunaCpf);
                    linha.appendChild(colunaDataNascimento);
                    linha.appendChild(colunaNumero);
                    linha.appendChild(colunaComplemento);
                    linha.appendChild(colunaLogradouro);
                    linha.appendChild(colunaCep);


                    document.getElementById("lista-cliente").appendChild(linha);
                }
            }
        })

        $("cidade-botao-salvar").on("click", function () {
            if ($id == -1) {
                inserir();
            } else {
                alterar();
            }
        });

        function alterar() {
            $nome = $("campo-nome").val();
            $.ajax({
                method: "post",
                url: "/cliente/update",
                data: {
                    IdCidade: $idcidade,
                    Nome: $nome,
                    Cpf: $cpf,
                    DataNascimento: $datanascimento,
                    Numero: $numero,
                    Complemento: $complemento,
                    Logradouro: $logradouro,
                    Cep: $cep
                },
                success: function (data) {
                    $id = -1;
                    $("#modalCadastroCliente").modal("hide");
                    obterTodos();
                    limparCampos();
                },
                error: function (data) {
                    console.log("ERRO");
                }
            });
        }

        function inserir() {
            $nome = $("#campo-nome").val();
            $.ajax({
                method: "post",
                url: "/cidade/store",
                data: {
                    Nome: $nome,
                },
                success: function (data) {
                    $id = -1;
                    $("#modalCadastroCidade").modal("hide");
                    obterTodos();
                    limparCampos();
                },
                error: function (data) {
                    console.log("ERRO");
                }
            })
        }

        function limparCampos() {
            $("#campo-nome").val("");
        }

        $(".table").on("click", ".botao-apagar", function () {
            $id = $(this).data("id");
            $.ajax({
                url: '/cidade/apagar/' + $id,
                method: 'get',
                success: function (data) {
                    obterTodos();
                },
                error: function (data) {
                    console.log('TENTE NOVAMENTE');
                }
            });
        });

        obterTodos();
    }
});