using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace View.Controllers
{
    public class CidadeController : Controller
    {
        private CidadeRepository repository;

        // GET: Cidade
        public CidadeController()
        {
            repository = new CidadeRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos(string busca)
        {
            List<Cidade> cidades = repository.ObterTodos(busca);
            return Json(cidades, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Store(Cidade cidade)
        {
            cidade.RegistroAtivo = true;
            repository.Inserir(cidade);
            return Json(cidade);
        }

        [HttpGet]
        [Route("apagar/{id}")]
        public JsonResult Apagar(int id)
        {
            bool apagou = repository.Apagar(id);
            return Json(new { status = apagou }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("ObterPeloId/{id}")]
        public JsonResult ObterPeloId(int id)
        {
            Cidade cidade = repository.ObterPeloId(id);
            return Json(cidade, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(Cidade cidade)
        {
            bool alterou = repository.Atualizar(cidade);
            return Json(new { status = alterou });
        }


    }
}