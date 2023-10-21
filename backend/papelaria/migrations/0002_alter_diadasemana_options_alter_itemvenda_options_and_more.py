# Generated by Django 4.2.6 on 2023-10-20 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('papelaria', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='diadasemana',
            options={'verbose_name': 'Dia da Semana', 'verbose_name_plural': 'Dias da Semana'},
        ),
        migrations.AlterModelOptions(
            name='itemvenda',
            options={'verbose_name': 'Item de Venda', 'verbose_name_plural': 'Itens de Venda'},
        ),
        migrations.AlterModelOptions(
            name='vendedor',
            options={'verbose_name_plural': 'Vendedores'},
        ),
        migrations.AlterField(
            model_name='diadasemana',
            name='dia',
            field=models.PositiveIntegerField(),
        ),
    ]