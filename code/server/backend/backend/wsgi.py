"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

SERVER_BASE = 'c:/Apache24/_projects/nomad/server'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

sys.path.append(SERVER_BASE)
sys.path.append(f'{SERVER_BASE}/backend')
sys.path.append(f'{SERVER_BASE}/chat_messages')
sys.path.append(f'{SERVER_BASE}/conventions')
sys.path.append(f'{SERVER_BASE}/organizations')
sys.path.append(f'{SERVER_BASE}/profiles')


application = get_wsgi_application()
