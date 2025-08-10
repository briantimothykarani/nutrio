from django.db import models
from django.contrib.auth.models import User

class Athlete(models.Model):
    SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student_profile',
        null=True,
        blank=True
    )

    # Temporarily allow null and blank for migration
    athlete = models.CharField(max_length=150, null=True, blank=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES,null=True, blank=True)
    bday = models.DateTimeField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    weight = models.PositiveIntegerField(null=True, blank=True)
    about_athlete = models.TextField(null=True, blank=True)
    profile_pic = models.ImageField(upload_to="profile_pics/", null=True, blank=True)
    fitness_plan = models.TextField(null=True, blank=True)
    meal_plan = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.athlete} - Height: {self.height} inches, Weight: {self.weight} lbs"

    class Meta:
        ordering = ['athlete']