from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ChatMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='messages_sent', blank=True, null=True)
    recipient = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='messages_received', blank=True, null=True)
    date = models.DateTimeField()
    msg = models.CharField(max_length=512)
