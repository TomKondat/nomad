from .chat_token_builder import ChatTokenBuilder
from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from .models import EmptyClass
from .serializers import EmptySerializer
from requests.exceptions import RequestException
import re

APP_ID = '832ecb8d44cf4e0c83f3196781f68cb0'
APP_CERTIFICATE = '9f546b511f7e49ab9f7d42e8e1f7e7e6'
ORG_NAME = '71959135'
APP_NAME = '1122013'
# CUSTOMER_ID = '0f7f01bf832143ce87016b13cdc8b4b2'
# SECRET = '46c9763929034ccfbe36909c7fdea6cb'
AGORA_HOST = 'api.agora.io'
REST_API = 'a71.chat.agora.io'
WEB_SOCKET = 'msync-api-71.chat.agora.io'
SERVER_URL = 'http://127.0.0.1:8000'




HOST_URL_APP_KEY  = f"https://{REST_API}/{ORG_NAME}/{APP_NAME}"



def getAppToken(expireTime):
    return ChatTokenBuilder.build_app_token(APP_ID,APP_CERTIFICATE,expireTime)

def getUserToken(expireTime,uid):
    return ChatTokenBuilder.build_user_token(APP_ID,APP_CERTIFICATE,uid,expireTime) 

def get_auth_headers(token):
    return {
        'Authorization': f"Bearer {token}",
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }


class Get_Token(APIView):  #api/get_token/user/?uid=[name]
    http_method_names = ['get']

    def get(self,request, token_type):
        if token_type == 'app':
            return self.getAppToken(request)
        elif token_type == 'user':
            return self.getUserToken(request)


    def getAppToken(self,request):
        token = getAppToken(expireTime=5000)
        return  Response({'appToken':token})


    def getUserToken(self,request):
        uid = request.GET.get('uid',None)
        if uid:
            token = getUserToken(expireTime=5000,uid=uid)
            return Response({'userToken':token})
        return Response('uid is missing',status=status.HTTP_400_BAD_REQUEST)





class Users(ModelViewSet):
    queryset = EmptyClass.objects.none()
    serializer_class = EmptySerializer

    @action(detail=False, methods=['POST'])
    def register_users(self,request):
        token = getAppToken(5000)
        users = request.data.get('users',None)
        case_id = request.data.get('caseId',None)

        missing_props={
            **({'error':'users missing'} if not users else {}),
            **({'error':'case id missing'} if not case_id else {})
        }

        if len(missing_props) > 0:
            return Response({'missing parameters':missing_props}, status=status.HTTP_400_BAD_REQUEST)

        responses=[]
        headers = get_auth_headers(token)

        for i in range(len(users)):
            username, password, first_name = users[i]['username'], users[i]['password'], users[i]['first_name']
            if not username or not password or not first_name:
                return Response(f"missing values of user in index {i}", status=status.HTTP_400_BAD_REQUEST)

            uid = re.sub(r'[^\w\s]', '', username)
            payload={
                'username':uid,
                'password':password,
                'nickname':first_name,
            }


            try:
                res = requests.post(f"{HOST_URL_APP_KEY}/users",headers=headers,json=payload)
                res.raise_for_status()
                responses.append(res.json())
            except RequestException as e:
                return Response(f"agora error: {e}")

        return Response({'users':responses})


    @action(detail=False, methods=['POST'] ) #api/agora/users/register_user/ post request =[uid, password, username ]
    def register_user(self,request):
        token = getAppToken(5000)
        uid = request.data.get('uid',None)
        password = request.data.get('password',None)
        username = request.data.get('username',None)

        missing_props = {
            **({'error':'missing uid'}if not uid else {}),
            **({'error': 'missing password'} if not password else {}),
            **({'error': 'missing username'} if not username else {}),
        }

        if len(missing_props) > 0:
            return Response({'missing parameters':missing_props},status=status.HTTP_400_BAD_REQUEST)

        headers = get_auth_headers(token)
        payload = {
            'username': uid,
            'password': password,
            'nickname': username
        }

        try:
            res = requests.post(f"{HOST_URL_APP_KEY}/users",json=payload,headers=headers)
            res.raise_for_status()
            return Response(res.json(),status=status.HTTP_200_OK)
        except RequestException as e:
            return Response(f"agora error: {e}")
