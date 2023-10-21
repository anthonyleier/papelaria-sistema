from rest_framework import serializers

from papelaria.models import Cliente, Vendedor, Produto, Venda, ItemVenda


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = '__all__'


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'


class VendaSerializer(serializers.ModelSerializer):
    produtos = ProdutoSerializer(many=True, read_only=True)

    class Meta:
        model = Venda
        fields = '__all__'


class ItemVendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVenda
        fields = ['produto', 'quantidade', 'comissao']
