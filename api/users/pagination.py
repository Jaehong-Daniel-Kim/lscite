from rest_framework.pagination import PageNumberPagination


class SearchListSmallPagination(PageNumberPagination):
    page_size = 5
