from django.contrib import admin

from papelaria.models import Cliente, Vendedor, Produto, DiaDaSemana, Venda, ItemVenda


class ClienteAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'email', 'telefone']
    list_display_links = ['nome']
    search_fields = ['nome', 'email']
    list_per_page = 20
    ordering = ['id']


class VendedorAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'email', 'telefone']
    list_display_links = ['nome']
    search_fields = ['nome', 'email']
    list_per_page = 20
    ordering = ['id']


class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['codigo', 'descricao', 'valor_unitario', 'percentual_comissao']
    list_display_links = ['codigo', 'descricao']
    search_fields = ['descricao']
    list_per_page = 20
    ordering = ['codigo']


class DiaDaSemanaAdmin(admin.ModelAdmin):
    list_display = ['dia', 'percentual_minimo', 'percentual_maximo']
    list_display_links = ['dia']
    ordering = ['dia']


class ItemVendaInline(admin.TabularInline):
    model = ItemVenda


class VendaAdmin(admin.ModelAdmin):
    list_display = ['id', 'numero_nota_fiscal', 'data_hora', 'cliente', 'vendedor']
    search_fields = ['numero_nota_fiscal']
    list_per_page = 20
    ordering = ['numero_nota_fiscal']
    inlines = [ItemVendaInline]


class ItemVendaAdmin(admin.ModelAdmin):
    list_display = ['id', 'venda', 'produto', 'quantidade', 'comissao']
    list_per_page = 20


admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Vendedor, VendedorAdmin)
admin.site.register(Produto, ProdutoAdmin)
admin.site.register(DiaDaSemana, DiaDaSemanaAdmin)
admin.site.register(Venda, VendaAdmin)
admin.site.register(ItemVenda, ItemVendaAdmin)
