from rest_framework.pagination import PageNumberPagination


class UserSearchListSmallPagination(PageNumberPagination):
    page_size = 5


class EmailSearchLargePagination(PageNumberPagination):
    page_size = 30
