
import { Card, CardContent, Typography, Avatar } from '@mui/material';

function LandingPageTestimonials() {
  const testimonials = [
    {
      name: "Paul ",
      message: "Very good website.",
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "Mary ",
      message: "Hi, I'm Paula Wairimu from Maryland your website helped me track my calories and reach my fitness goal.",
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "Mitchelle",
      message: "I like your website can you add a feature where you can track your water intake",
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "Juan pedro",
      message: "Please make an app fo this .",
      avatar: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="flex flex-wrap justify-around p-8">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="w-full sm:w-80 md:w-1/3 mb-6 shadow-lg rounded-lg">
          <Avatar src={testimonial.avatar} className="mx-auto mt-4" />
          <CardContent className="text-center">
            <Typography variant="h6" className="font-semibold">{testimonial.name}</Typography>
            <Typography variant="body2" color="textSecondary" className="mt-2">{testimonial.message}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default LandingPageTestimonials;
