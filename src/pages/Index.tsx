import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Package, Phone, MapPin, User, Star, CheckCircle2 } from "lucide-react";

import kaabaImg from "@/assets/kaaba.jpg";
import nabawiImg from "@/assets/masjid-nabawi.jpg";
import arafatImg from "@/assets/mount-arafat.jpg";
import minaImg from "@/assets/mina-tents.jpg";

const SLIDES = [
  { src: kaabaImg, label: "The Holy Kaaba — Mecca" },
  { src: nabawiImg, label: "Masjid an-Nabawi — Medina" },
  { src: arafatImg, label: "Mount Arafat" },
  { src: minaImg, label: "Mina — Tent City" },
];

const MALE_ITEMS = Array.from({ length: 21 }, (_, i) => `Essential Item ${i + 1}`);
const FEMALE_ITEMS = Array.from({ length: 22 }, (_, i) => `Essential Item ${i + 1}`);

const Index = () => {
  const [kit, setKit] = useState<"male" | "female">("male");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const items = kit === "male" ? MALE_ITEMS : FEMALE_ITEMS;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitted(true);
    toast.success("Order placed successfully! We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero with slideshow */}
      <section className="relative overflow-hidden text-primary-foreground" style={{ minHeight: 420 }}>
        {/* Background slideshow */}
        {SLIDES.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.label}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-primary/70" />

        {/* Content */}
        <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
          <p
            className="mb-6 font-[Amiri] text-3xl font-bold tracking-wide md:text-4xl animate-pulse"
            style={{
              color: '#f5d778',
              textShadow: '0 0 10px rgba(245, 215, 120, 0.9), 0 0 30px rgba(212, 175, 55, 0.7), 0 0 60px rgba(212, 175, 55, 0.4), 0 0 100px rgba(212, 175, 55, 0.2)',
              filter: 'brightness(1.2)',
            }}
          >
            ✦ Sunnah for Ummah ✦
          </p>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Star className="h-4 w-4 fill-current text-accent" />
            <span>Complete Pilgrimage Essentials</span>
          </div>
          <h1 className="mb-4 font-[Amiri] text-4xl font-bold leading-tight md:text-5xl lg:text-6xl drop-shadow-lg">
            Hajj & Umrah Kit
          </h1>
          <p className="mx-auto max-w-lg text-lg text-primary-foreground/90 drop-shadow">
            Everything you need for a blessed journey — carefully curated and packed in one convenient kit.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-1.5"><Package className="h-4 w-4" /> 21+ Items</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Quality Assured</span>
          </div>
          {/* Slide label & dots */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-xs tracking-wide text-primary-foreground/70 uppercase">{SLIDES[currentSlide].label}</p>
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-6 bg-accent" : "w-2 bg-primary-foreground/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12 space-y-12">
        {/* Kit Selection */}
        <section>
          <h2 className="mb-6 text-center font-[Amiri] text-2xl font-bold text-foreground md:text-3xl">
            Choose Your Kit
          </h2>
          <RadioGroup
            value={kit}
            onValueChange={(v) => setKit(v as "male" | "female")}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "male", label: "Men's Kit", count: 21 },
              { value: "female", label: "Women's Kit", count: 22 },
            ].map((option) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className={`cursor-pointer rounded-xl border-2 p-6 text-center transition-all ${
                  kit === option.value
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                <p className="text-lg font-semibold text-foreground">{option.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{option.count} items included</p>
              </Label>
            ))}
          </RadioGroup>
        </section>

        {/* Items Grid */}
        <section>
          <h2 className="mb-6 text-center font-[Amiri] text-2xl font-bold text-foreground md:text-3xl">
            What's Inside ({items.length} Items)
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((item, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="flex items-center gap-3 p-4">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Order Form */}
        <section>
          <h2 className="mb-6 text-center font-[Amiri] text-2xl font-bold text-foreground md:text-3xl">
            Order Now
          </h2>

          {submitted ? (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Order Received!</h3>
                <p className="text-muted-foreground">
                  Thank you, <strong>{name}</strong>. We will contact you at <strong>{phone}</strong> to confirm your order.
                </p>
                <Button variant="outline" onClick={() => { setSubmitted(false); setName(""); setPhone(""); setAddress(""); }}>
                  Place Another Order
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <form onSubmit={handleOrder} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                      <User className="h-4 w-4 text-muted-foreground" /> Full Name
                    </Label>
                    <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
                      <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
                    </Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-muted-foreground" /> Delivery Address
                    </Label>
                    <Input id="address" placeholder="Enter your full delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div className="rounded-lg bg-secondary p-3 text-center text-sm text-muted-foreground">
                    Selected: <strong className="text-foreground">{kit === "male" ? "Men's" : "Women's"} Kit</strong> — {items.length} items
                  </div>
                  <Button type="submit" size="lg" className="w-full text-base font-semibold">
                    Place Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 text-center text-sm text-muted-foreground">
        <p>May your pilgrimage be accepted. Hajj Mabroor! 🕋</p>
      </footer>
    </div>
  );
};

export default Index;
