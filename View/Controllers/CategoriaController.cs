using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace View.Controllers
{
    public class CategoriaController: Controller
    {
        private CategoriaRepository repository;

        //GET: Categoria
        public CategoriaController()
        {
            repository = new CategoriaRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos(string busca)
        {
            List<Categoria> categorias = repository.ObterTodos(busca);
            return Json(categorias, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Store(Categoria categoria)
        {
            categoria.RegistroAtivo = true;
            repository.Inserir(categoria);
            return Json(categoria);
        }

        [HttpGet]
        [Route ("apagar/{id}")]
        public JsonResult Apagar(int id)
        {
            bool apagou = repository.Apagar(id);
            return Json(new { status = apagou }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("ObterPeloId/{id}")]
        public JsonResult ObterPeloId(int id)
        {
            Categoria categoria = repository.ObterPeloId(id);
            return Json(categoria, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(Categoria categoria)
        {
            bool alterou = repository.Atualizar(categoria);
            return Json(new { status = alterou });
        }
    }
}