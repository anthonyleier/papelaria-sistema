from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from papelaria.models import Cliente, Vendedor, Produto, Venda, DiaDaSemana


class ProdutoTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.produto_data = {'descricao': 'Tesoura sem ponta', 'valor_unitario': '6.50', 'percentual_comissao': '0.05'}
        self.response = self.client.post(reverse('produto-list-create'), self.produto_data, format='json')

    # GET - produtos/
    def test_listar_produtos(self):
        response = self.client.get(reverse('produto-list-create'))
        produto_buscado = self.produto_data
        produto_buscado['codigo'] = 1
        self.assertIn(produto_buscado, response.json())

    # GET - produtos/id
    def test_consultar_produtos(self):
        response = self.client.get(reverse('produto-retrieve-update-destroy', kwargs={'pk': 1}))
        produto_buscado = self.produto_data
        produto_buscado['codigo'] = 1
        self.assertDictEqual(produto_buscado, response.json())

    # POST - produtos/
    def test_criar_produto(self):
        produto_criado = self.produto_data
        produto_criado['codigo'] = 1
        self.assertDictEqual(produto_criado, self.response.json())

    # PUT - produtos/id
    def test_atualizar_produto(self):
        produto_atualizado = self.produto_data
        produto_atualizado['codigo'] = 1
        produto_atualizado['valor_unitario'] = '10.50'
        response = self.client.put(reverse('produto-retrieve-update-destroy', kwargs={'pk': 1}), produto_atualizado, format='json')
        self.assertDictEqual(produto_atualizado, response.json())

    # DELETE - produtos/id
    def test_deletar_produto(self):
        response = self.client.delete(reverse('produto-retrieve-update-destroy', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ClienteTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cliente_data = {'nome': 'Leonardo Sousa Ferreira', 'email': 'LeonardoSousaFerreira@teleworm.us', 'telefone': '(51) 9843-9940'}
        self.response = self.client.post(reverse('cliente-list-create'), self.cliente_data, format='json')

    # GET - clientes/
    def test_listar_clientes(self):
        response = self.client.get(reverse('cliente-list-create'))
        cliente_buscado = self.cliente_data
        cliente_buscado['id'] = 1
        self.assertIn(cliente_buscado, response.json())

    # GET - clientes/id
    def test_consultar_clientes(self):
        response = self.client.get(reverse('cliente-retrieve-update-destroy', kwargs={'pk': 1}))
        cliente_buscado = self.cliente_data
        cliente_buscado['id'] = 1
        self.assertDictEqual(cliente_buscado, response.json())

    # POST - clientes/
    def test_criar_cliente(self):
        cliente_criado = self.cliente_data
        cliente_criado['id'] = 1
        self.assertDictEqual(cliente_criado, self.response.json())

    # PUT - clientes/id
    def test_atualizar_cliente(self):
        cliente_atualizado = self.cliente_data
        cliente_atualizado['id'] = 1
        cliente_atualizado['nome'] = 'Leonardo'
        response = self.client.put(reverse('cliente-retrieve-update-destroy', kwargs={'pk': 1}), cliente_atualizado, format='json')
        self.assertDictEqual(cliente_atualizado, response.json())

    # DELETE - clientes/id
    def test_deletar_cliente(self):
        response = self.client.delete(reverse('cliente-retrieve-update-destroy', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class VendedorTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.vendedor_data = {'nome': 'Bianca Oliveira Azevedo', 'email': 'BiancaOliveiraAzevedo@teleworm.us', 'telefone': '(12) 2179-5851'}
        self.response = self.client.post(reverse('vendedor-list-create'), self.vendedor_data, format='json')

    # GET - vendedores/
    def test_listar_vendedores(self):
        response = self.client.get(reverse('vendedor-list-create'))
        vendedor_buscado = self.vendedor_data
        vendedor_buscado['id'] = 1
        self.assertIn(vendedor_buscado, response.json())

    # GET - vendedores/id
    def test_consultar_vendedores(self):
        response = self.client.get(reverse('vendedor-retrieve-update-destroy', kwargs={'pk': 1}))
        vendedor_buscado = self.vendedor_data
        vendedor_buscado['id'] = 1
        self.assertDictEqual(vendedor_buscado, response.json())

    # POST - vendedores/
    def test_criar_vendedor(self):
        vendedor_criado = self.vendedor_data
        vendedor_criado['id'] = 1
        self.assertDictEqual(vendedor_criado, self.response.json())

    # PUT - vendedores/id
    def test_atualizar_vendedor(self):
        vendedor_atualizado = self.vendedor_data
        vendedor_atualizado['id'] = 1
        vendedor_atualizado['nome'] = 'Bianca'
        response = self.client.put(reverse('vendedor-retrieve-update-destroy', kwargs={'pk': 1}), vendedor_atualizado, format='json')
        self.assertDictEqual(vendedor_atualizado, response.json())

    # DELETE - vendedores/id
    def test_deletar_vendedor(self):
        response = self.client.delete(reverse('vendedor-retrieve-update-destroy', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class VendaTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cliente = Cliente.objects.create(nome='Matheus Rodrigues Cavalcanti', email='MatheusRodriguesCavalcanti@teleworm.us', telefone='(51) 3829-5220')
        self.vendedor = Vendedor.objects.create(nome='Alex Fernandes Araujo', email='AlexFernandesAraujo@dayrep.com', telefone='(12) 4880-3155')
        self.produto = Produto.objects.create(descricao='Papel Sulfite A4', valor_unitario=20.99, percentual_comissao=0.03)
        self.venda_data = {
            'numero_nota_fiscal': '12345',
            'cliente': self.cliente.id,
            'vendedor': self.vendedor.id,
            'produtos': [{'produto': self.produto.codigo, 'quantidade': 10}]
        }
        self.response = self.client.post(reverse('venda-list-create'), self.venda_data, format='json')

    # GET - vendas/
    def test_listar_vendas(self):
        venda_esperada = {
            'id': 1,
            'numero_nota_fiscal': '12345',
            'cliente': {'id': 1, 'nome': 'Matheus Rodrigues Cavalcanti'},
            'vendedor': {'id': 1, 'nome': 'Alex Fernandes Araujo'},
            'produtos': [{'codigo': '1', 'descricao': 'Papel Sulfite A4', 'valor_unitario': '20.99', 'percentual_comissao': '0.03'}]
        }
        response = self.client.get(reverse('venda-list-create'))
        venda_encontrada = response.json()[0]
        self.assertDictContainsSubset(venda_esperada, venda_encontrada)

    # GET - vendas/id
    def test_consultar_vendas(self):
        venda_esperada = {
            'id': 1,
            'numero_nota_fiscal': '12345',
            'cliente': {'id': 1, 'nome': 'Matheus Rodrigues Cavalcanti'},
            'vendedor': {'id': 1, 'nome': 'Alex Fernandes Araujo'},
        }
        response = self.client.get(reverse('venda-retrieve-update-destroy', kwargs={'pk': 1}))
        venda_encontrada = response.json()
        self.assertDictContainsSubset(venda_esperada, venda_encontrada)

    # POST - vendas/
    def test_criar_venda(self):
        venda_esperada = {
            'id': 1,
            'numero_nota_fiscal': '12345',
            'cliente': 1,
            'vendedor': 1,
        }
        self.assertDictContainsSubset(venda_esperada, self.response.json())

    # PUT - vendas/id
    def test_atualizar_venda(self):
        cliente_novo = Cliente.objects.create(nome='Anthony Cruz', email='anthony@email.com', telefone='(49) 9999-8888')
        venda_atualizada = self.venda_data
        venda_atualizada['cliente'] = cliente_novo.id
        response = self.client.put(reverse('venda-retrieve-update-destroy', kwargs={'pk': 1}), venda_atualizada, format='json')
        del venda_atualizada['produtos']
        self.assertDictContainsSubset(venda_atualizada, response.json())

    # DELETE - vendas/id
    def test_deletar_venda(self):
        response = self.client.delete(reverse('venda-retrieve-update-destroy', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_calculo_comissao(self):
        venda = Venda.objects.get(id=self.response.data['id'])
        self.assertEqual(float(venda.calcular_total_comissao()), 6.297)  # (10 * 20.99 * 0.03) = 6.297

    def test_calculo_comissao_vendedor(self):
        response = self.client.get(reverse('vendedor-comissao-list') + '?data_inicial=2023-01-01&data_final=2023-12-31')
        vendedor = [vendedor for vendedor in response.data if vendedor["id_vendedor"] == self.vendedor.id][0]
        self.assertEqual(float(vendedor.get('valor_comissao')), 6.297)  # 6.297 - Alex Fernandes Araujo

    def test_calculo_comissao_limitador_minimo(self):
        DiaDaSemana.objects.create(dia=2, percentual_minimo=0.04, percentual_maximo=0.07)
        venda_data = {
            'numero_nota_fiscal': '64789',
            'data_hora': '2023-10-18T12:00:00Z',
            'cliente': self.cliente.id,
            'vendedor': self.vendedor.id,
            'produtos': [{'produto': self.produto.codigo, 'quantidade': 10}]
        }
        response = self.client.post(reverse('venda-list-create'), venda_data, format='json')
        venda = Venda.objects.get(id=response.data['id'])
        self.assertEqual(float(venda.calcular_total_comissao()), 8.396)  # (10 * 20.99 * 0.04) = 8.396

    def test_calculo_comissao_limitador_maximo(self):
        DiaDaSemana.objects.create(dia=4, percentual_minimo=0.00, percentual_maximo=0.02)
        venda_data = {
            'numero_nota_fiscal': '64789',
            'data_hora': '2023-10-20T12:00:00Z',
            'cliente': self.cliente.id,
            'vendedor': self.vendedor.id,
            'produtos': [{'produto': self.produto.codigo, 'quantidade': 10}]
        }
        response = self.client.post(reverse('venda-list-create'), venda_data, format='json')
        venda = Venda.objects.get(id=response.data['id'])
        self.assertEqual(float(venda.calcular_total_comissao()), 4.198)  # (10 * 20.99 * 0.02) = 4.198
