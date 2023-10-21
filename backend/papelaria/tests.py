from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from papelaria.models import Cliente, Vendedor, Produto, Venda


class ProdutoTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.produto_data = {'codigo': 'P123', 'descricao': 'Caneta', 'valor_unitario': 2.5, 'percentual_comissao': 0.05}
        self.response = self.client.post(reverse('produto-list-create'), self.produto_data, format='json')

    def test_criar_produto(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_produtos(self):
        response = self.client.get(reverse('produto-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ClienteTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cliente_data = {'nome': 'João', 'email': 'joao@example.com', 'telefone': '123456789'}
        self.response = self.client.post(reverse('cliente-list-create'), self.cliente_data, format='json')

    def test_criar_cliente(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_clientes(self):
        response = self.client.get(reverse('cliente-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class VendedorTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.vendedor_data = {'nome': 'Maria', 'email': 'maria@example.com', 'telefone': '987654321'}
        self.response = self.client.post(reverse('vendedor-list-create'), self.vendedor_data, format='json')

    def test_criar_vendedor(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_vendedores(self):
        response = self.client.get(reverse('vendedor-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class VendaTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cliente = Cliente.objects.create(nome='Ana', email='ana@example.com', telefone='555555555')
        self.vendedor = Vendedor.objects.create(nome='Pedro', email='pedro@example.com', telefone='999999999')
        self.produto = Produto.objects.create(codigo='P123', descricao='Lápis', valor_unitario=1.0, percentual_comissao=0.1)
        self.venda_data = {
            'numero_nota_fiscal': 'N123',
            'data_hora': '2023-09-20T12:00:00Z',
            'cliente': self.cliente.id,
            'vendedor': self.vendedor.id,
            'produtos': [{'produto': self.produto.id, 'quantidade': 10}]
        }
        self.response = self.client.post(reverse('venda-list-create'), self.venda_data, format='json')

    def test_criar_venda(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_vendas(self):
        response = self.client.get(reverse('venda-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_calculo_comissao(self):
        venda = Venda.objects.get(id=self.response.data['id'])
        self.assertEqual(venda.calcular_total_comissao(), 1.0)  # (10 * 1.0 * 0.1) = 1.0
