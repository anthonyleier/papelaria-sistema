# Generated by Django 4.2.6 on 2023-10-25 02:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('papelaria', '0009_itemvenda_percentual_comissao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venda',
            name='data_hora',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 25, 2, 3, 39, 897712, tzinfo=datetime.timezone.utc)),
        ),
    ]
