# Generated by Django 3.1.2 on 2021-02-04 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bolus_pal', '0002_auto_20210126_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bolus',
            name='bolus_total',
            field=models.FloatField(),
        ),
    ]