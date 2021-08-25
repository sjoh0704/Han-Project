from django.http import JsonResponse 
import json
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import requests
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
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(CartNonParam, self).dispatch(request, *args, **kargs)

    # cart 생성
    def post(self, request):
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        response = requests.post('{}/apis/v1/carts'.format(CART_SERVICE_URL), data, headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data=data, message='success')
        return self.response(data=data, message='fails', status=400)
        


    # get all carts
    def get(self, request):
       
        response = requests.get('{}/apis/v1/carts'.format(CART_SERVICE_URL), headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = data, message='success')
        return self.response(data=data, message='fails', status=400)
 


    # delete cart item 
class CartParams(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(CartParams, self).dispatch(request, *args, **kargs)    
    

    def delete(self, request, word):
        response = requests.delete('{}/apis/v1/carts/{}'.format(CART_SERVICE_URL, word), headers=self.headers)

        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data=data, message='success')
        return self.response(data=data, message='fails', status=400)
    

    # check
    def post(self, request, word):
        if word != 'check':
            return self.response(message='잘못된 경로', status=400)
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        response = requests.post('{}/apis/v1/carts/check'.format(CART_SERVICE_URL), data, headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = data, message='success')

        return self.response(message='fails', status=400)



    # cart by user(buyer) 가져오기 
class CartByUser(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(CartByUser, self).dispatch(request, *args, **kargs)

    def get(self, request, pk):
        response = requests.get('{}/apis/v1/carts/users/{}'.format(CART_SERVICE_URL, pk), headers=self.headers)        
        if response.status_code == 200:
            data = json.loads(response.content)
            return self.response(data = data, message='success')
        return self.response(message='fails', status=400)



        
