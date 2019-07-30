using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace View.Controllers
{
    public class TarefaController : Controller
    {
        TarefaRepository repository;

        public TarefaController()
        {
            repository = new TarefaRepository();
        }

        // GET: Tarefa
        [HttpGet]
        public ActionResult Index()
        {
            UsuarioRepository usuarioRepository = new UsuarioRepository();
            ViewBag.Usuarios = usuarioRepository.ObterTodos("");

            ProjetoRepository projetoRepository = new ProjetoRepository();
            ViewBag.Projetos = projetoRepository.ObterTodos("");

            CategoriaRepository categoriaRepository = new CategoriaRepository();
            ViewBag.Categorias = categoriaRepository.ObterTodos("");

            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            List<Tarefa> tarefas = repository.ObterTodos("");
            return Json(tarefas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Store(Tarefa tarefa)
        {
            tarefa.RegistroAtivo = true;
            repository.Inserir(tarefa);
            return Json(tarefa);
        }
    }
}