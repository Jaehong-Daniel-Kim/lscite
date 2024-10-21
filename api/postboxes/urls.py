from django.urls import include, path
from .views import Postboxes, PostboxesDetail

""" DOC
    ##### api/v1/postboxes #####
    [GET]
    get all mailboxes associated to an user.
    Response: 
    {
        name: string,
        description: string,
    }
    
    [POST]
    create a new mailbox associated to an user.
    Request:
    {
        name: string,
        description: string,
    }
    
    ##### api/v1/postboxes/<pk> #####
    [GET]
    get a detailed information about a mailbox that is associated to an user.
    Response:
    {
        name: string,
        description: string,
        total_mails: int,
    }
    
    [PUT]
    update the name or description of a mailbox
    Request:
    {
        pk: int,
        name: optional(string)
        description: optional(string),
    }
    
    [DELETE]
    remove a mailbox
    Request:
    {
        pk: int,
    }
    
"""

urlpatterns = [
    path("", Postboxes.as_view()),  # GET | POST
    path("<str:postbox>", PostboxesDetail.as_view())  # GET | PUT | DELETE
]
