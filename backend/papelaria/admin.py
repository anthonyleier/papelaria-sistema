from django.contrib import admin
from papelaria.models import Cliente, Vendedor, Produto, DiaDaSemana, Venda, ItemVenda


class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'telefone')


class VendedorAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'telefone')


class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'descricao', 'valor_unitario', 'percentual_comissao')


class DiaDaSemanaAdmin(admin.ModelAdmin):
    list_display = ('dia', 'percentual_minimo', 'percentual_maximo')


class ItemVendaInline(admin.TabularInline):
    model = ItemVenda


class VendaAdmin(admin.ModelAdmin):
    list_display = ('numero_nota_fiscal', 'data_hora', 'cliente', 'vendedor')
    inlines = [ItemVendaInline]


class ItemVendaAdmin(admin.ModelAdmin):
    list_display = ('venda', 'produto', 'quantidade', 'comissao')


admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Vendedor, VendedorAdmin)
admin.site.register(Produto, ProdutoAdmin)
admin.site.register(DiaDaSemana, DiaDaSemanaAdmin)
admin.site.register(Venda, VendaAdmin)
admin.site.register(ItemVenda, ItemVendaAdmin)
