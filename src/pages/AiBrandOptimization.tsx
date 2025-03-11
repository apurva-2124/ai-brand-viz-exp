
import { useState } from "react";
import { Container } from "@/components/Container";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WandSparkles, Code, PhoneCall, TrendingUp, Rocket, Gem, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OptimizationCaseStudy } from "@/components/optimization/OptimizationCaseStudy";
import { Testimonials } from "@/components/optimization/Testimonials";
import { CheckoutForm } from "@/components/optimization/CheckoutForm";
import { Link } from "react-router-dom";

const AiBrandOptimization = () => {
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handlePurchase = (productId: string, productName: string) => {
    setSelectedProduct(productName);
    setShowCheckout(true);
    
    // Scroll to checkout form
    setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookConsultation = () => {
    toast({
      title: "Coming Soon",
      description: "Booking for AI Strategy Calls will open soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <Container>
            <div className="flex items-center mb-8">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Optimize Your Brand for AI Search – Be Found, Not Forgotten
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
                AI platforms like ChatGPT, Gemini and Claude are changing search. If your brand isn't optimized for AI discovery, you're losing visibility. Let's fix that.
              </p>
              <Button size="lg" onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })}>
                Fix My AI Brand Visibility Now
              </Button>
            </div>
          </Container>
        </section>

        {/* Key Offerings */}
        <section id="offerings" className="py-20">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">Key AI Brand Visibility Optimization Services</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Choose the right solution to boost your brand's visibility in AI search results
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary/50 transition-all flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2 w-full">
                      <div className="flex items-center gap-2 w-full justify-center">
                        <WandSparkles className="h-5 w-5 text-purple-500" />
                        <span className="text-center">AI Brand Visibility Optimization Toolkit</span>
                      </div>
                    </CardTitle>
                    <Badge variant="secondary">$99</Badge>
                  </div>
                  <CardDescription className="text-center">
                    Step-by-step guides to structure your content for AI search
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>AI-optimized content templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Keyword research methodology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Content structure guidelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Self-implementation approach</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Button 
                      className="w-full"
                      onClick={() => handlePurchase("content-toolkit", "AI Brand Visibility Optimization Toolkit")}
                    >
                      Get Started For $99
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2 w-full">
                      <div className="flex items-center gap-2 w-full justify-center">
                        <Code className="h-5 w-5 text-blue-500" />
                        <span className="text-center">AI-Optimized FAQ & Schema</span>
                      </div>
                    </CardTitle>
                    <Badge variant="secondary">$299</Badge>
                  </div>
                  <CardDescription className="text-center">
                    Hands-on guidance to embed structured data
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Custom FAQ development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Schema markup implementation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Technical implementation guide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>2 weeks of implementation support</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Button 
                      className="w-full"
                      onClick={() => handlePurchase("faq-schema", "AI-Optimized FAQ & Schema")}
                    >
                      Get Started For $299
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary hover:border-primary/80 transition-all relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg animate-pulse" variant="destructive">
                    Only 5 spots left!
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2 w-full">
                      <div className="flex items-center gap-2 w-full justify-center">
                        <PhoneCall className="h-5 w-5 text-green-500" />
                        <span className="text-center">AI Search Visibility Accelerator</span>
                      </div>
                    </CardTitle>
                    <Badge variant="secondary">$499+</Badge>
                  </div>
                  <CardDescription className="text-center">
                    1:1 Coaching & Custom strategy to rank in AI-driven search
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Personalized AI visibility audit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Custom content strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>60-min strategy session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>4 weeks of implementation support</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={handleBookConsultation}
                    >
                      Book My Strategy Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Case Study Section */}
        <section className="py-20 bg-secondary/50">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-16">See The Results</h2>
            <OptimizationCaseStudy />
          </Container>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Hear from brands who've optimized their AI visibility
            </p>
            <Testimonials />
          </Container>
        </section>

        {/* Join Beta Group */}
        <section className="py-20 bg-primary/10">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">Limited Time Offer</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Spots Limited – Join our AI Search Optimization Beta Group now!
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Be among the first to optimize your brand for AI search engines before your competitors catch up. Early adopters receive exclusive benefits and priority support.
              </p>
              <Button 
                size="lg" 
                onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Fix My AI Brand Visibility Now
              </Button>
            </div>
          </Container>
        </section>

        {/* Checkout Section */}
        {showCheckout && (
          <section id="checkout" className="py-20">
            <Container>
              <h2 className="text-3xl font-bold text-center mb-4">Complete Your Purchase</h2>
              <p className="text-muted-foreground text-center mb-12">
                You're purchasing: {selectedProduct}
              </p>
              <div className="max-w-md mx-auto">
                <CheckoutForm productName={selectedProduct || ""} />
              </div>
            </Container>
          </section>
        )}
      </main>
    </div>
  );
};

export default AiBrandOptimization;
