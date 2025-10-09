

from datetime import date
from django.shortcuts import get_object_or_404
import openai
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated



from .serializers import AthleteSerializer, UserRegisterSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from athlete.models import Athlete


@ensure_csrf_cookie
def csrf_cookie_view(request):
    return JsonResponse({'detail': 'CSRF cookie set'})


class AthleteList(generics.ListCreateAPIView):
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer
    permission_classes = [IsAuthenticated]

class AthleteListCreate(generics.ListCreateAPIView):
    serializer_class = AthleteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Athlete.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AthleteUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            athlete = Athlete.objects.get(id=id, user=request.user)
            serializer = AthleteSerializer(athlete)
            return Response(serializer.data)
        except Athlete.DoesNotExist:
            return Response({"error": "athlete not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            athlete = Athlete.objects.get(id=id, user=request.user)
            serializer = AthleteSerializer(athlete, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Athlete.DoesNotExist:
            return Response({"error": "athlete not found."}, status=status.HTTP_404_NOT_FOUND)


class AthleteDelete(generics.RetrieveDestroyAPIView):
    serializer_class = AthleteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Athlete.objects.filter(user=self.request.user)

class UserRegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(is_active=False)
#            activateEmail(request, user, user.email) # type: ignore
            return Response({'message': 'Activation link sent to email.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            athlete = Athlete.objects.get(user=request.user)
            serializer = AthleteSerializer(athlete)
            return Response(serializer.data)
        except Athlete.DoesNotExist:
            return Response({"error": "athlete profile not found."}, status=status.HTTP_404_NOT_FOUND)
class AthleteSummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        athlete = get_object_or_404(Athlete, id=id)
        serializer = AthleteSerializer(athlete)
        age = date.today().year - athlete.bday.year

        prompt = f"""
        Create a brief athlete profile summary:
        suggest a one-week training plan focused on general fitness and conditioning.
        suggest a one-week balanced diet/nutrition plan optimized for their fitness and weight goals.

        Name: {serializer.data['athlete']}
        Sex: {serializer.data['sex']}
        Birthday: {serializer.data['bday']}
        Height: {serializer.data['height']} inches
        Weight: {serializer.data['weight']} lbs
        Age: {age}
        """

        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}]
            )
            summary = response.choices[0].message['content']
            return Response({'summary': summary})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AthleteSavePlansAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        athlete = get_object_or_404(Athlete, id=id, user=request.user)
        fitness_plan = request.data.get("fitness_plan")
        meal_plan = request.data.get("meal_plan")

        # Save the plans to athlete instance or another model as per your DB schema
        if fitness_plan:
            athlete.fitness_plan = fitness_plan
        if meal_plan:
            athlete.meal_plan = meal_plan
        athlete.save()

        return Response({"message": "Plans saved successfully."})            


