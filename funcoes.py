from supabase_service import supabase
from flask import jsonify


def consultar_tabela():#função para pesquisar os itens
    consulta = (supabase.table("produtos").select("nome, categoria, barulho").execute())
    consulta_ok = consulta.data
    return jsonify(consulta_ok)
    pass