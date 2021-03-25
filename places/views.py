from django.shortcuts import render
from django.template.loader import render_to_string
from .models import Place, TheUser, TheUserPlace, PlaceNear
import numpy as np
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict


def get_last_location(u):
    user_place = TheUserPlace.objects.filter(user=u).first()
    if user_place is None:
        user_place = Place.objects.get(place_id=np.random.randint(1, 5000))
        TheUserPlace(user=u, place=user_place).save()
    else:
        user_place = user_place.place
    return user_place


def random_place_name():
    return np.random.choice(["Cafe", "Restaraunt", "Tavern", "Bar", "Sight", "Hotel",
                                       "Shopping mall", "Entertainment"])


def top_near_locations(user_place):
    places_near = PlaceNear.objects.filter(place1=user_place.place_id).order_by("dist")
    places = []
    items = []
    for i, el in enumerate(places_near):
        if i>0:
            x = Place.objects.get(place_id = el.place2)
            name = random_place_name()
            #places.append(model_to_dict(Place.objects.get(place_id = el.place2)))
            places.append([name, x.lat, x.long, i])
            x = model_to_dict(x)
            x['name'] = name
            items.append(x)
            #print(el.dist)
        if i>10:
            break
    return places[0:5], items[0:5], places[5:], items[5:]

def get_my_locations(u):
    visited = list(TheUserPlace.objects.filter(user=u, predicted=False).values_list("place__place_id", flat=True))
    d  = list(Place.objects.filter(place_id__in = visited).values())
    for el in d:
        el['name'] = random_place_name()
    return d

def get_locations(u, context):
    user_place = get_last_location(u)
    visited = list(TheUserPlace.objects.filter(user=u, predicted=False).values_list("place__place_id", flat=True))
    places_near = PlaceNear.objects.filter(place1=user_place.place_id).values_list("place2", flat=True)
    items = list(Place.objects.filter(place_id__in=places_near).values())
    for el in items:
        el['name'] = random_place_name()
        if el['place_id'] in visited:
            el['selected'] = 1
        else:
            el['selected'] = 0
    context["location"] = user_place
    context['items'] = items

    return context


# Create your views here.
def index(request):

    #random_place = Place.objects.get(place_id=np.random.randint(1, 5000))
    #places_near = PlaceNear.objects.filter(place1 = random_place.place_id).values_list("place2", flat=True)
    #items = list(Place.objects.filter(place_id__in = places_near).values())
    context = {"local_template" : "places/items_list.html"}
    #context['location'] = random_place
    #context['location'] = places_near

    user_id = request.COOKIES.get('user_id', False)

    if request.method=="POST":
        print(request.POST)
        u = TheUser.objects.filter(user_id=user_id).first()
        if str(request.POST["add"]) == "1":
            TheUserPlace(user=u, place=Place.objects.get(place_id=int(request.POST['place_id']))).save()
        else:
            TheUserPlace.objects.filter(user=u, place__place_id=request.POST['place_id'],
                         predicted=False).delete()
        return JsonResponse({"ok":1})


    if user_id:
        u = TheUser.objects.filter(user_id=user_id).first()
        if u is not None:
            context["user"] = model_to_dict(u)
            context = get_locations(u, context)
            return render(request, "places/container.html", context)

    u = TheUser.objects.all().last()
    if not u:
        user_id = 1
    else:
        user_id = u.user_id+1
    u2 = TheUser(user_id=user_id, name=np.random.choice(["Tim", "Tom", "Roma","Bob", "John", "Jack"]))
    u2.save()
    context["user"] = model_to_dict(u2)
    context = get_locations(u, context)
    response = render(request, "places/container.html", context)
    response.set_cookie("user_id", u2.user_id)
    return response

# Create your views here.
def recommend(request):
    context = {"local_template":"places/recommend.html"}

    user_id = request.COOKIES.get('user_id', 1)
    u = TheUser.objects.filter(user_id=user_id).first()
    user_place = get_last_location(u)
    context["loc"] = model_to_dict(user_place)
    locations, items, locationsf, itemsf = top_near_locations(user_place)
    context["locations"] =locations + locationsf
    context["items"] = items
    context["itemsf"] = itemsf
    context["myitems"] = get_my_locations(u)

    print(context)

    context["user"] = model_to_dict(u)
    #print(context['loc'])
    #print(locations)

    #context['loc'] = {"long":-33.890542, "lat":151.274856}
    """
    context["locations"]  =  [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ]
    """

    return render(request, "places/container.html", context)