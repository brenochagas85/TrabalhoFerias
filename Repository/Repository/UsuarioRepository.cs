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
    public class UsuarioRepository : IUsuarioRepository
    {
        SistemaContext context;

        public UsuarioRepository()
        {
            context = new SistemaContext();
        }

        public bool Apagar(int id)
        {
            Usuario usuario = (from x in context.Usuarios where x.Id == id select x).FirstOrDefault();
            if(usuario == null)
            {
                return false;
            }

            usuario.RegistroAtivo = false;
            context.SaveChanges();
            return true;
        }

        public bool Atualizar(Usuario usuario)
        {
            Usuario usuarioOriginal = (from x in context.Usuarios where x.Id == usuario.Id select x).FirstOrDefault();
            if(usuarioOriginal == null)
            {
                return false;
            }

            usuarioOriginal.Nome = usuario.Nome;
            usuarioOriginal.Login = usuario.Login;
            usuarioOriginal.Senha = usuario.Senha;
            context.SaveChanges();
            return true;
        }

        public int Inserir(Usuario usuario)
        {
            usuario.DataCriacao = DateTime.Now;
            context.Usuarios.Add(usuario);
            context.SaveChanges();
            return usuario.Id;
        }

        public Usuario ObterPeloId(int id)
        {
            return (from x in context.Usuarios where x.Id == id select x).FirstOrDefault();
        }

        public List<Usuario> ObterTodos(string busca)
        {
            return (from x in context.Usuarios where x.RegistroAtivo == true && (x.Nome.Contains(busca) || x.Login.Contains(busca)) orderby x.Nome select x).ToList();
        }
    }
}
