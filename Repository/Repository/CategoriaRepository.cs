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
    public class CategoriaRepository: ICategoriaRepository
    {
        SistemaContext context;

        public CategoriaRepository()
        {
            context = new SistemaContext();
        }

        public bool Apagar(int id)
        {
            Categoria categoria = (from x in context.Categorias where x.Id == id select x).FirstOrDefault();
            if (categoria == null)
            {
                return false;
            }

            categoria.RegistroAtivo = false;
            context.SaveChanges();
            return true;
        }

        public bool Atualizar(Categoria categoria)
        {
            Categoria categoriaOriginal = (from x in context.Categorias where x.Id == categoria.Id select x).FirstOrDefault();
            if (categoriaOriginal == null)
            {
                return false;
            }

            categoriaOriginal.Id = categoria.Id;
            categoriaOriginal.Nome = categoria.Nome;
            context.SaveChanges();
            return true;
        }

        public int Inserir(Categoria categoria)
        {
            categoria.DataCriacao = DateTime.Now;
            context.Categorias.Add(categoria);
            context.SaveChanges();
            return categoria.Id;
        }

        public Categoria ObterPeloId(int id)
        {
            return (from x in context.Categorias where x.Id == id select x).FirstOrDefault();
        }

        public List<Categoria> ObterTodos(string busca)
        {
            return (from x in context.Categorias where x.RegistroAtivo == true && (x.Nome.Contains(busca) || x.Nome.Contains(busca)) orderby x.Nome select x).ToList();
        }
    }
}
