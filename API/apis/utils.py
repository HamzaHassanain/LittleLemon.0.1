def is_manager_or_admin(user):
    return user.is_superuser or user.groups.filter(name="manager").exists()
def is_admin(user):
    return user.is_superuser
def is_delivery(user):
    return user.groups.filter(name="delivery").exists()