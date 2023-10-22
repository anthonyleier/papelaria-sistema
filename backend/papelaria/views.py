from datetime import datetime

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from papelaria.models import Cliente, Vendedor, Produto, Venda
from papelaria.serializers import ClienteSerializer, VendedorSerializer, ProdutoSerializer, VendaSerializer, ItemVendaSerializer


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


class VendaListCreateView(APIView):
    def get(self, request):
        vendas = Venda.objects.all()
        serializer = VendaSerializer(vendas, many=True)
        return Response(serializer.data)

    def post(self, request):
        venda_serializer = VendaSerializer(data=request.data)
        if venda_serializer.is_valid():
            venda = venda_serializer.save()

            produtos = request.data.get('produtos', [])
            for produto in produtos:
                item_serializer = ItemVendaSerializer(data=produto)
                if item_serializer.is_valid():
                    item_serializer.save(venda=venda)
                else:
                    return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(venda_serializer.data, status=status.HTTP_201_CREATED)
        return Response(venda_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VendaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer

# Altere a view abaixo para receber data inicio e data fim para retornar os dados


class VendedorComissaoList(APIView):
    def get(self, request, format=None):
        data_incial_param = request.query_params.get('data_inicial')
        data_final_param = request.query_params.get('data_final')

        if not data_incial_param or not data_final_param:
            return Response({'error': 'É necessário fornecer data inicial e data final.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            data_inicial = datetime.strptime(data_incial_param, '%Y-%m-%d').date()
            data_final = datetime.strptime(data_final_param, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Formato de data inválido. Use o formato AAAA-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        vendedores = Vendedor.objects.all()
        comissoes = []
        for vendedor in vendedores:
            total_comissao = 0
            print(data_inicial)
            print(data_final)
            vendas = Venda.objects.filter(vendedor=vendedor, data_hora__range=(data_inicial, data_final))

            for venda in vendas:
                total_comissao += venda.calcular_total_comissao()

            comissoes.append({'id_vendedor': vendedor.id, 'nome_vendedor': vendedor.nome, 'qtd_vendas': len(vendas), 'valor_comissao': total_comissao})
        return Response(comissoes)
