from django.db import connection


def calcular_percentual_aceitavel(percentual_produto, percentual_minimo_dia, percentual_maximo_dia):
    minimo_aceitavel = max(percentual_produto, percentual_minimo_dia)
    maximo_aceitavel = min(minimo_aceitavel, percentual_maximo_dia)
    return maximo_aceitavel


def buscar_quantidade_itemvenda(venda_id, produto_id):
    query = "SELECT quantidade FROM papelaria_itemvenda WHERE produto_id = %s AND venda_id = %s LIMIT 1;"
    parametros = [produto_id, venda_id]

    with connection.cursor() as cursor:
        cursor.execute(query, parametros)
        resultados = cursor.fetchone()

    return resultados[0] if resultados else 0


def montar_json_venda(venda):
    retorno = {}
    retorno['id'] = venda.id
    retorno['numero_nota_fiscal'] = venda.numero_nota_fiscal
    retorno['data_hora'] = venda.data_hora
    retorno['cliente'] = venda.cliente.id
    retorno['vendedor'] = venda.vendedor.id

    json_produtos = []
    produtos = venda.produtos.all()
    for produto in produtos:
        json_produto = {}
        json_produto["codigo"] = produto.codigo
        json_produto["descricao"] = produto.descricao
        json_produto["valor_unitario"] = produto.valor_unitario
        json_produto["percentual_comissao"] = produto.percentual_comissao
        json_produto["quantidade"] = buscar_quantidade_itemvenda(venda_id=venda.id, produto_id=produto.codigo)
        json_produtos.append(json_produto)

    retorno['produtos'] = json_produtos
    return retorno
