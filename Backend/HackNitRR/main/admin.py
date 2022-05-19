from django.contrib import admin
from main.models import (Hospital, Doctor, To_image, Results)
# Register your models here.
admin.site.register(Hospital)
admin.site.register(Doctor)
admin.site.register(To_image)
admin.site.register(Results)