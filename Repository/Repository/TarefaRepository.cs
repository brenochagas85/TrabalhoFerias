using Model;
using Repository.DataBase;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class TarefaRepository : ITarefaRepository
    {
        SistemaContext context;

        public TarefaRepository()
        {
            context = new SistemaContext();
        }

        public bool Apagar(int id)
        {
            Tarefa tarefa = (from x in context.Tarefas where x.Id == id select x).FirstOrDefault();
            if(tarefa == null)
            {
                return false;
            }
            tarefa.RegistroAtivo = false;
            context.SaveChanges();
            return true;
        }

        public bool Atualizar(Tarefa tarefa)
        {
            Tarefa tarefaOriginal = (from x in context.Tarefas where x.Id == tarefa.Id select x).FirstOrDefault();
            if (tarefaOriginal == null)
            {
                return false;
            }
            tarefaOriginal.Id = tarefa.Id;
            tarefaOriginal.IdCategoria = tarefa.IdCategoria;
            tarefaOriginal.IdProjeto = tarefa.IdProjeto;
            tarefaOriginal.IdUsuarioResponsavel = tarefa.IdUsuarioResponsavel;
            tarefaOriginal.Projeto = tarefa.Projeto;
            tarefaOriginal.Categoria = tarefa.Categoria;
            tarefaOriginal.Usuario = tarefa.Usuario;
            tarefaOriginal.Titulo = tarefa.Titulo;
            tarefaOriginal.Duracao = tarefa.Duracao;
            tarefaOriginal.Descricao = tarefa.Descricao;
            context.SaveChanges();
            return true;
        }

        public int Inserir(Tarefa tarefa)
        {
            tarefa.DataCriacao = DateTime.Now;
            context.Tarefas.Add(tarefa);
            context.SaveChanges();
            return tarefa.Id;
        }

        public Tarefa ObterPeloId(int id)
        {
            return (from x in context.Tarefas where x.Id == id select x).FirstOrDefault();
        }

        public List<Tarefa> ObterTodos(string busca)
        {
            return (from x in context.Tarefas where x.RegistroAtivo == true && (x.Titulo.Contains(busca) || x.Descricao.Contains(busca)) orderby x.Titulo select x).ToList();
        }
    }
}
