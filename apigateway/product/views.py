from django.core import serializers
from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
import requests
from django.conf import settings
import os 
PRODUCT_SERVICE_URL = os.environ.get("PRODUCT_SERVICE_URL",'http://localhost:8100')

class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)



class ProductNonParam(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(ProductNonParam, self).dispatch(request, *args, **kargs)

    
    def post(self, request):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        response = requests.post('{}/apis/v1/product'.format(PRODUCT_SERVICE_URL), data, headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data=data, message='success')

        return self.response(data=data, message='fail', status=400)
        



    def get(self, request):
        response = requests.get('{}/apis/v1/product'.format(PRODUCT_SERVICE_URL), headers=self.headers)
        if response.status_code == 200:
            data = json.loads(response.content)
       
            return self.response(data = data, message='success')
        return self.response(message='fails', status=400)
 


# localhost:8000/apis/v1/product/1

class ProductStatusView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(ProductStatusView, self).dispatch(request, *args, **kargs)
    

    def get(self, request, pk):
        response = requests.get('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, pk), headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = data, message='success')
        return self.response(data=data, message='fails', status=400)


        
    def post(self, request, pk):
     
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, pk), data, headers=self.headers)
        res_data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data= res_data, message='success')
        return self.response(data=res_data, message='fails', status=400)


    
    
    def delete(self, request, pk):
        response = requests.delete('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, pk), headers=self.headers)
        res_data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data=res_data, message='success')
        return self.response(data=res_data, message='fails', status=400)

    

# localhost:8000/apis/v1/product/user/1

class ProductByUser(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(ProductByUser, self).dispatch(request, *args, **kargs)
    
    def get(self, request, pk):
        response = requests.get('{}/apis/v1/product/user/{}'.format(PRODUCT_SERVICE_URL, pk), headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            
            return self.response(data = data, message='success')
        return self.response(data=data, message='fails', status=400)

 

        
