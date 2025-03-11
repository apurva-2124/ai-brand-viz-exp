
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    content: "Our brand was invisible to AI search until we implemented the optimization strategy. Now we're consistently mentioned by ChatGPT and other AI assistants.",
    author: "Sarah Johnson",
    role: "Marketing Director, FitnessPro",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    content: "The AI Content Optimization Toolkit was a game-changer. We saw our brand mentions increase by 315% in just 6 weeks after implementation.",
    author: "Michael Chen",
    role: "CEO, GreenTech Solutions",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    content: "The 1:1 strategy session gave us insights we couldn't have discovered on our own. Worth every penny as we're now featured in AI responses consistently.",
    author: "Jessica Williams",
    role: "Digital Strategy Lead, Urban Eats",
    image: "/placeholder.svg"
  }
];

export const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="h-full">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="italic text-muted-foreground">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
