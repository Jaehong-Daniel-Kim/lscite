from django.urls import include, path
from .views import Postboxes, PostboxesDetail

urlpatterns = [
    path("", Postboxes.as_view()),  # GET | POST
    path("<int:pk>", PostboxesDetail.as_view())  # GET | PUT | DELETE
]
