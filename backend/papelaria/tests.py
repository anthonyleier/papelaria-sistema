from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from papelaria.models import Cliente, Vendedor, Produto, Venda


class ProdutoTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.produto_data = {'descricao': 'Tesoura sem ponta', 'valor_unitario': 6.50, 'percentual_comissao': 0.05}
        self.response = self.client.post(reverse('produto-list-create'), self.produto_data, format='json')

    def test_criar_produto(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_produtos(self):
        response = self.client.get(reverse('produto-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ClienteTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cliente_data = {'nome': 'Leonardo Sousa Ferreira', 'email': 'LeonardoSousaFerreira@teleworm.us', 'telefone': '(51) 9843-9940'}
        self.response = self.client.post(reverse('cliente-list-create'), self.cliente_data, format='json')

    def test_criar_cliente(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_clientes(self):
        response = self.client.get(reverse('cliente-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class VendedorTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.vendedor_data = {'nome': 'Bianca Oliveira Azevedo', 'email': 'BiancaOliveiraAzevedo@teleworm.us', 'telefone': '(12) 2179-5851'}
        self.response = self.client.post(reverse('vendedor-list-create'), self.vendedor_data, format='json')

    def test_criar_vendedor(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_vendedores(self):
        response = self.client.get(reverse('vendedor-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


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

    def test_criar_venda(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_listar_vendas(self):
        response = self.client.get(reverse('venda-list-create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_calculo_comissao(self):
        venda = Venda.objects.get(id=self.response.data['id'])
        self.assertEqual(float(venda.calcular_total_comissao()), 6.29700)  # (10 * 20.99 * 0.03) = 6.297
