#! env python3

from users.models import User

user = User.object.create_superuser(username="admin",
                                    email="admin@email.com",
                                    password="admin",
                                    phone="010-1234-5678",
                                    language="en")

user.save()
