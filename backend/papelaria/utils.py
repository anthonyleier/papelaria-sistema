def calcular_percentual_aceitavel(percentual_produto, percentual_minimo_dia, percentual_maximo_dia):
    minimo_aceitavel = max(percentual_produto, percentual_minimo_dia)
    maximo_aceitavel = min(minimo_aceitavel, percentual_maximo_dia)
    return maximo_aceitavel
