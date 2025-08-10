from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
import stripe

from .models import Athlete
from .forms import AthleteForm  


def view_athlete(request):
    athletes = Athlete.objects.all()
    return render(request, 'view_athlete.html', {'athletes': athletes})


def add_athlete(request):
    if request.method == 'POST':
        form = AthleteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('athlete:view_athlete')
    else:
        form = AthleteForm()
    return render(request, 'add_athlete.html', {'form': form})


def delete_athlete(request, id):
    athlete = get_object_or_404(Athlete, id=id)
    if request.method == 'POST':
        athlete.delete()
        return redirect('athlete:view_athlete')
    return render(request, 'delete_athlete.html', {'athlete': athlete})


def update_athlete(request, id):
    athlete = get_object_or_404(Athlete, id=id)
    if request.method == 'POST':
        form = AthleteForm(request.POST, request.FILES, instance=athlete)
        if form.is_valid():
            form.save()
            return redirect('athlete:view_athlete')
    else:
        form = AthleteForm(instance=athlete)
    return render(request, 'update_athlete.html', {'form': form})


@login_required
def CreateCheckoutSessionView(request, id):
    athlete = get_object_or_404(Athlete, id=id)
    YOUR_DOMAIN = f"{request.scheme}://{request.get_host()}"

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': int(athlete.price * 100),
                    'product_data': {'name': athlete.name},
                },
                'quantity': 1,
            }],
            metadata={
                'id': id,
                'user_email': request.user.email,
            },
            mode='payment',
            success_url=f"{YOUR_DOMAIN}/payment-success/{id}/",
            cancel_url=f"{YOUR_DOMAIN}/pricing/{id}/",
        )
        return redirect(checkout_session.url, code=303)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
