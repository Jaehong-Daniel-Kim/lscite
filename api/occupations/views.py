from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Company, Department, Group, Team
from .serializers import CompanySerializer, DepartmentSerializer, GroupSerializer, TeamSerializer
import time

# Create your views here.


class Occupation(APIView):

    def get(self, request):
        time.sleep(3)
        try:
            companies = Company.objects.prefetch_related("department__group__team").all()
            serializer = CompanySerializer(companies, many=True)
            return Response({
                "status": "success",
                "message": "Data successfully retrieved",
                "detail": serializer.data,
            })
        except BaseException as e:
            return Response({
                "status": "error",
                "message": "Something's wrong",
                "detail": {}
            })
