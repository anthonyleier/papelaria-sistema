from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import datetime

from decimal import Decimal

from papelaria.utils import calcular_percentual_aceitavel


class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=15)

    def __str__(self):
        return self.nome


class Vendedor(models.Model):
    class Meta:
        verbose_name_plural = "Vendedores"

    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=15)

    def __str__(self):
        return self.nome


class Produto(models.Model):
    codigo = models.AutoField(primary_key=True, unique=True)
    descricao = models.CharField(max_length=200)
    valor_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    percentual_comissao = models.DecimalField(max_digits=3, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(0.10)])

    def __str__(self):
        return self.descricao


class DiaDaSemana(models.Model):
    class Meta:
        verbose_name = "Dia da Semana"
        verbose_name_plural = "Dias da Semana"

    dia = models.PositiveIntegerField()
    percentual_minimo = models.DecimalField(max_digits=3, decimal_places=2)
    percentual_maximo = models.DecimalField(max_digits=3, decimal_places=2)

    def __str__(self):
        return str(self.dia)


class Venda(models.Model):
    numero_nota_fiscal = models.CharField(max_length=20)
    data_hora = models.DateTimeField(default=datetime.now)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)
    produtos = models.ManyToManyField(Produto, through='ItemVenda')

    def calcular_total_comissao(self):
        total_comissao = 0
        for item in self.itemvenda_set.all():
            total_comissao += item.comissao
        return total_comissao

    def __str__(self):
        return f'Venda {self.numero_nota_fiscal}'


class ItemVenda(models.Model):
    class Meta:
        verbose_name = "Item de Venda"
        verbose_name_plural = "Itens de Venda"

    venda = models.ForeignKey(Venda, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()
    comissao = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    percentual_comissao = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def calcular_comissao(self):
        dia_semana = self.venda.data_hora.weekday()

        try:
            dia_semana_atual = DiaDaSemana.objects.get(dia=dia_semana)
            percentual_minimo_dia = dia_semana_atual.percentual_minimo
            percentual_maximo_dia = dia_semana_atual.percentual_maximo

        except DiaDaSemana.DoesNotExist:
            percentual_minimo_dia = 0
            percentual_maximo_dia = 0.1

        percentual_produto = self.produto.percentual_comissao
        percentual_comissao_item = calcular_percentual_aceitavel(percentual_produto, percentual_minimo_dia, percentual_maximo_dia)

        comissao_item = Decimal(self.quantidade) * self.produto.valor_unitario * Decimal(percentual_comissao_item)

        self.comissao = comissao_item
        self.percentual_comissao = percentual_comissao_item

        self.save()
        return comissao_item

    def __str__(self):
        return f'Item: {self.produto.descricao}'
