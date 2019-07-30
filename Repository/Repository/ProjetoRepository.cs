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
    public class ProjetoRepository : IProjetoRepository
    {
        SistemaContext context;

        public ProjetoRepository()
        {
            context = new SistemaContext();
        }

        public bool Apagar(int id)
        {
            Projeto projeto = (from x in context.Projetos where x.Id == id select x).FirstOrDefault();
            if (projeto == null)
            {
                return false;
            }
            projeto.RegistroAtivo = false;
            context.SaveChanges();
            return true;
        }

        public bool Atualizar(Projeto projeto)
        {
            Projeto projetoOriginal = (from x in context.Projetos where x.Id == projeto.Id select x).FirstOrDefault();
            if (projetoOriginal == null)
            {
                return false;
            }
            projetoOriginal.IdCliente = projeto.IdCliente;
            projetoOriginal.Nome = projeto.Nome;
            projetoOriginal.DataCriacao = projeto.DataCriacao;
            projetoOriginal.DataFinalizacao = projeto.DataFinalizacao;
            context.SaveChanges();
            return true;
        }

        public int Inserir(Projeto projeto)
        {
            projeto.DataCriacao = DateTime.Now;
            context.Projetos.Add(projeto);
            context.SaveChanges();
            return projeto.Id;
        }

        public Projeto ObterPeloId(int id)
        {
            return (from x in context.Projetos where x.Id == id select x).FirstOrDefault();
        }

        public List<Projeto> ObterTodos(string busca)
        {
            return (from x in context.Projetos where x.RegistroAtivo == true && (x.Nome.Contains(busca) || x.Nome.Contains(busca)) orderby x.Nome select x).ToList();
        }
    }
}
