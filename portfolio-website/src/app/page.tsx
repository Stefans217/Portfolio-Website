import Hero from "@/components/Hero";

export default function Home() {
    return (
        <main className="page-container !pt-0">
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center">
                <Hero name="Stefan Spataro" tagline="A network enthusiast who likes to build clever software solutions." photoSrc={["/images/ProfessionalVothPhoto.jpg", "/images/MountainPhoto.jpg"]} />
            </section>
        </main>
    );
}
