from datetime import date
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.conf import settings
import openai
from athlete.models import Athlete
import json

openai.api_key = settings.OPENAI_API_KEY

def generate_athlete_summary(request, id):
    athlete = get_object_or_404(Athlete, id=id)
    age = date.today().year - athlete.bday.year

    prompt = f"""
    Create a JSON object with the following keys: summary, fitness_plan, meal_plan.
    Each value should be a string.

    - summary: an athlete summary using the data
    - fitness_plan: a training plan focused on general fitness and conditioning
    - meal_plan: a balanced diet/nutrition plan optimized for their fitness and weight goals

    The data for the athlete:
    Name: {athlete.athlete}
    Sex: {athlete.sex}
    Birthday: {athlete.bday.date()}
    Height: {athlete.height} inches
    Weight: {athlete.weight} lbs
    Age: {age}
    Athlete details: {athlete.about_athlete}

    Respond only with a valid JSON object, no explanations.
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=1000,
        )
        content = response.choices[0].message['content']

        # Try parsing the content as JSON
        data = json.loads(content)

        # Validate keys (optional)
        if not all(k in data for k in ("summary", "fitness_plan", "meal_plan")):
            return JsonResponse({'error': 'Incomplete response from AI.'}, status=500)

        return JsonResponse(data)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Failed to parse AI response as JSON.', 'raw_response': content}, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
