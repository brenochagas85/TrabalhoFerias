$(() => {

    $id = -1;

    function obterTodos() {

        $("lista-tarefas").empty();

        $busca = $('#campo-pesquisa').val();
        $.ajax({
            url: 'tarefa/obtertodos',
            method: 'get',
            data: {

            },
        });
    }

    $(".table").on("click", ".botao-editar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/tarefa/obterpeloid/' + $id,
            method: 'get',
            data: {
                busca: $busca
            },

            success: function (data) {
                $id = data.Id;
                $('#campo-projeto').val(data.IdProjeto);
                $('#campo-categoria').val(data.IdCategoria);
                $('#campo-usuario').val(data.IdUsuarioResponsavel);

                $('#campo-titulo').val(data.Titulo);
                $('#campo-descricao').val(data.Descricao);
                $('#campo-duracao').val(data.Duracao.getFullYear() + "-" + (data.Duracao.getMonth() + 1) + "-" + data.Duracao.getDate());

                $("#modalCadastroTarefa").modal("show");
            }
        })
    });
    $("#campo-pesquisa").on("keyup", function (e) {
        if (e.keyCode == 13) {
            obterTodos();
        }
    });
    function obterTodos() {
        $("lista-tarefas").empty();

        $("#tarefa-botao-salvar").on("click", function () {
            if ($id == -1) {
                inserir();
            } else {
                alterar();
            }
        });

        function alterar() {
            $projeto = $('#campo-projeto').val();
            $categoria = $('#campo-categoria').val();
            $usuario = $('#campo-usuario').val();

            $titulo = $('#campo-titulo').val();
            $descricao = $('#campo-descricao').val();
            $duracao = $('#campo-duracao').val();

            $.ajax({
                method: "post",
                url: "/tarefa/update",
                data: {
                    IdUsuarioResponsavel: $usuario,
                    IdCategoria: $categoria,
                    IdProjeto: $projeto,

                    Titulo: $titulo,
                    Descricao: $descricao,
                    Duracao: $duracao,
                    Id: $id
                },
                success: function (data) {
                    $id = -1;
                    $("#modalCadastroTarefa").modal("hide");
                    obterTodos();
                    limparCampos();
                },
                error: function (data) {
                    console.log("TENTE NOVAMENTE");
                }
            })
        }

        function inserir() {
            $projeto = $('#campo-projeto').val();
            $categoria = $('#campo-categoria').val();
            $usuario = $('#campo-usuario').val();

            $titulo = $('#campo-titulo').val();
            $descricao = $('#campo-descricao').val();
            $duracao = $('#campo-duracao').val();

            $.ajax({
                method: "post",
                url: "/tarefa/store",
                data: {
                    IdUsuarioResponsavel: $usuario,
                    IdCategoria: $categoria,
                    IdProjeto: $projeto,

                    Titulo: $titulo,
                    Descricao: $descricao,
                    Duracao: $duracao
                },
                success: function (data) {
                    $id = -1;
                    $("#modalCadastroTarefa").modal("hide");
                    obterTodos();
                    limparCampos();
                },
                error: function (data) {
                    console.log("TENTE NOVAMENTE");
                }
            })
        }

        function limparCampos() {
            $('#campo-projeto').val("");
            $('#campo-categoria').val("");
            $('#campo-usuario').val("");

            $('#campo-titulo').val("");
            $('#campo-descricao').val("");
            $('#campo-duracao').val('2000-01-01');
        }

        $(".table").on("click", ".botao-apagar", function () {
            $id = $(this).data("id");
            $.ajax({
                url: '/tarefa/apagar/' + $id,
                method: 'get',
                success: function (data) {
                    obterTodos();
                },
                error: function (data) {
                    console.log('Deu ruim');
                }
            });

        })
    }
})