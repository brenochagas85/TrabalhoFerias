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
    public class CidadeRepository: ICidadeRepository
    {
        SistemaContext context;

        public CidadeRepository()
        {
            context = new SistemaContext();
        }

        public bool Apagar(int id)
        {
            Cidade cidade = (from x in context.Cidades where x.Id == id select x).FirstOrDefault();
            if(cidade == null)
            {
                return false;
            }

            cidade.RegistroAtivo = false;
            context.SaveChanges();
            return true;
        }

        public bool Atualizar(Cidade cidade)
        {
            Cidade cidadeOriginal = (from x in context.Cidades where x.Id == cidade.Id select x).FirstOrDefault();
            if (cidadeOriginal == null)
            {
                return false;
            }

            cidadeOriginal.Id = cidade.Id;
            cidadeOriginal.IdEstado = cidade.IdEstado;
            cidadeOriginal.Nome = cidade.Nome;
            cidadeOriginal.NumeroHabitante = cidade.NumeroHabitante;
            context.SaveChanges();
            return true;
        }

        public int Inserir (Cidade cidade)
        {
            cidade.DataCriacao = DateTime.Now;
            context.Cidades.Add(cidade);
            context.SaveChanges();
            return cidade.Id;
        }

        public Cidade ObterPeloId(int id)
        {
            return (from x in context.Cidades where x.Id == id select x).FirstOrDefault();
        }

        public List<Cidade> ObterTodos(string busca)
        {
            return(from x in context.Cidades where x.RegistroAtivo == true && (x.Nome.Contains(busca) || x.Nome.Contains(busca)) orderby x.Nome select x).ToList();
        }
    }
}
