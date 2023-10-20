from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from papelaria.models import Cliente, Vendedor, Produto, Venda, ItemVenda, DiaDaSemana
from papelaria.serializers import ClienteSerializer, VendedorSerializer, ProdutoSerializer, VendaSerializer, ItemVendaSerializer, DiaDaSemanaSerializer


class ProdutoListCreateView(generics.ListCreateAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


class ProdutoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


class ClienteListCreateView(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class ClienteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class VendedorListCreateView(generics.ListCreateAPIView):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer


class VendedorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer


class VendaListCreateView(generics.ListCreateAPIView):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer


class VendaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer


class VendedorComissaoList(APIView):
    def get(self, request, format=None):
        vendedores = Vendedor.objects.all()
        comissoes = {}
        for vendedor in vendedores:
            total_comissao = 0
            vendas = Venda.objects.filter(vendedor=vendedor)
            for venda in vendas:
                total_comissao += venda.calcular_total_comissao()
            comissoes[vendedor.nome] = total_comissao
        return Response(comissoes)
