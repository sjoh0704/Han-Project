from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db import IntegrityError, reset_queries
from django.core.validators import validate_email, ValidationError
from django.contrib.auth import login, authenticate, logout
import requests

USER_SERVICE_URL = 'http://localhost:8100'

class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)


class UserLoginView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserLoginView, self).dispatch(request, *args, **kargs)


    def post(self, request):
        try:
            data = json.loads(request.body)
        except:
            data = request.POST

        response = requests.post('{}/apis/v1/user/login'.format(USER_SERVICE_URL), data)  # product-service url
        dic_response = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = dic_response, message='user login success', status=200)
        else:
            return self.response(message='user login fails', status=400)


class UserLogoutView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserLogoutView, self).dispatch(request, *args, **kargs)

    # def get(self, request):
    #     logout(request)
    #     return self.response()


class UserAPIView(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserAPIView, self).dispatch(request, *args, **kargs)


#     def post(self, request):
#         print(request.body)
#         try:
            
#             data = json.loads(request.body)
        
#         except:
#             data = request.POST
#         username = data.get('username', '')
#         if not username:
#             return self.response(message="아이디를 입력해주세요", status=400)
#         password = data.get('password', '')
#         if not password:
#             return self.response(message="패스워드를 입력해주세요", status=400)
#         email = data.get('email', '')
#         if not email:
#             return self.response(message="email을 입력해주세요", status=400)
#         try:
#             validate_email(email)
#         except ValidationError:
#             return self.response(message="유효하지 않은 이메일입니다.", status=400)


#         try:
#             user = User.objects.create_user(username, email, password)
#         except IntegrityError:
#             return self.response(message="존재하는 아이디입니다.", status=400)
        
#         data = {
#             'user_id': user.id,
#             'username': user.username,
#             "useremail": user.email
#         }
#         return self.response(data = data, message="create user success", status=200)


# # 이 부분은 유의 
#     def delete(self, request, pk):
      
    
#         response = requests.delete("http://localhost:8000/apis/v1/user/{}/product".format(pk))  # product-service url
#         print(response)
#         if response.status_code == 200:
#             user = get_object_or_404(User, id=pk)
#             user.delete()
#             return self.response(message='deleting user success', status=200)
#         else:
#             return self.response(message='deleting user fails', status=400)

        

#     def get(self, request, pk):
#         user = get_object_or_404(User, id=pk)
#         data = {
#             "id": user.id,
#             "username": user.username,
#             "useremail": user.email
#         }

#         return self.response(data=data ,message='get user success', status=200)
        
#     def put(self, request, pk):
#         data = json.loads(request.body)

#         user = get_object_or_404(User, id=pk)

#         user.username = data['username']
#         user.email = data['email']
        
#         user.save()
        
#         return self.response(message='edit user success')
        
 
