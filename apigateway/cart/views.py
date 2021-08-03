from django.http import JsonResponse 
import json
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

import requests
from django.conf import settings
import os 
CART_SERVICE_URL = os.environ.get("CART_SERVICE_URL",'http://172.30.1.34:8080')

class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)



class CartNonParam(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(CartNonParam, self).dispatch(request, *args, **kargs)

    # cart 생성
    def post(self, request):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
 
        response = requests.post('{}/apis/v1/carts'.format(CART_SERVICE_URL), data)
        if response.status_code == 200:
            data = json.loads(response.content)
            return self.response(data=data, message='success')
        else:
            data = json.loads(response.content)
            return self.response(data=data, message='fails', status=400)
        


    # get all carts
    def get(self, request):
  
        response = requests.get('{}/apis/v1/carts'.format(CART_SERVICE_URL))

        if response.status_code == 200:
            data = json.loads(response.content)
       
            return self.response(data = data, message='success')
        return self.response(message='fails', status=400)
 


    # delete cart item 
class CartParams(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(CartParams, self).dispatch(request, *args, **kargs)    
    

    def delete(self, request, pk):
        response = requests.delete('{}/apis/v1/carts/{}'.format(CART_SERVICE_URL, pk))
        if response.status_code == 200:
            return self.response(message='success')
        return self.response(message='fails', status=400)



    # cart by user(buyer) 가져오기 
class CartByUser(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(CartByUser, self).dispatch(request, *args, **kargs)

    def get(self, request, pk):
        response = requests.get('{}/apis/v1/carts/users/{}'.format(CART_SERVICE_URL, pk))        
        if response.status_code == 200:
            data = json.loads(response.content)
            return self.response(data = data, message='success')
        return self.response(message='fails', status=400)



     # cart check
class CartCheck(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(CartCheck, self).dispatch(request, *args, **kargs)


    def post(self, request):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
 
        response = requests.post('{}/apis/v1/carts/check'.format(CART_SERVICE_URL), data)
        if response.status_code == 200:
            data = json.loads(response.content)
            return self.response(data = data, message='success')

        return self.response(message='fails', status=400)
        