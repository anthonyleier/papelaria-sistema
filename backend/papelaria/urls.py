from django.urls import path
from papelaria import views

urlpatterns = [
    path('produtos/', views.ProdutoListCreateView.as_view(), name='produto-list-create'),
    path('produtos/<int:pk>/', views.ProdutoRetrieveUpdateDestroyView.as_view(), name='produto-retrieve-update-destroy'),

    path('clientes/', views.ClienteListCreateView.as_view(), name='cliente-list-create'),
    path('clientes/<int:pk>/', views.ClienteRetrieveUpdateDestroyView.as_view(), name='cliente-retrieve-update-destroy'),

    path('vendedores/', views.VendedorListCreateView.as_view(), name='vendedor-list-create'),
    path('vendedores/<int:pk>/', views.VendedorRetrieveUpdateDestroyView.as_view(), name='vendedor-retrieve-update-destroy'),

    path('vendedores-comissao/', views.VendedorComissaoList.as_view(), name='vendedor-comissao-list'),

    path('vendas/', views.VendaListCreateView.as_view(), name='venda-list-create'),
    path('vendas/<int:pk>/', views.VendaRetrieveUpdateDestroyView.as_view(), name='venda-retrieve-update-destroy'),
]
