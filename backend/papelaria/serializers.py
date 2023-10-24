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


class ProdutoSerializerCustom(serializers.Serializer):
    codigo = serializers.CharField()
    descricao = serializers.CharField()
    valor_unitario = serializers.DecimalField(max_digits=10, decimal_places=2)
    percentual_comissao = serializers.DecimalField(max_digits=5, decimal_places=2)


class ClienteSerializerCustom(serializers.Serializer):
    id = serializers.IntegerField()


class VendedorSerializerCustom(serializers.Serializer):
    id = serializers.IntegerField()


class ItemVendaSerializerCustom(serializers.Serializer):
    produto = ProdutoSerializerCustom()
    quantidade = serializers.IntegerField()


class VendaSerializerCustom(serializers.Serializer):
    id = serializers.IntegerField()
    numero_nota_fiscal = serializers.CharField()
    data_hora = serializers.DateTimeField()
    cliente = ClienteSerializerCustom()
    vendedor = VendedorSerializerCustom()
    produtos = ProdutoSerializerCustom(many=True)
    itemvenda_set = ItemVendaSerializerCustom(many=True)
