$(function () {
    $id = -1;
    $(".table").on("click", ".botaoEditar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/cidade/obterpeloid/' + $id,
            method: 'get',
            success: function (data) {
                $id = data.Id;
                $("campo-id-estado").val(data.IdEstado);
                $("#campo-nome").val(data.Nome);
                $("#campo-numero-habitante").val(data.NumeroHabitante)
                $("#modalCadastroCategoria").modal("show");
            }
        })
    });


    function obterTodos() {
        $busca = $("#campo-pesquisa").val();
        $("#lista-cidade").empty();
        $.ajax({
            url: '/cidade/obtertodos',
            method: 'get',
            data: {
                busca: $busca
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var dado = data[i];


                    var linha = document.createElement("tr");
                    var colunaIdEstado = document.createElement("td");
                    colunaIdEstado.innerHTML = dado.IdEstado;

                    var colunaNome = document.createElement("td");
                    colunaNome.innerHTML = dado.Nome;

                    var colunaNumeroHabitante = document.createElement("td");
                    colunaNome.innerHTML = dado.colunaNumeroHabitante;

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

                    linha.appendChild(colunaIdEstado);
                    linha.appendChild(colunaNome);
                    linha.appendChild(colunaNumeroHabitante);
                    document.getElementById("lista-cidade").appendChild(linha);
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
                url: "/cidade/update",
                data: {
                    IdEstado: $idestado,
                    Nome: $nome,
                    NumeroHabitante: $numerohabitante
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